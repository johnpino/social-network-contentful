import { EntryProps } from "contentful-management";
import createEntry from "./createEntry";
import getEntries from "./getEntries";
import getEntry from "./getEntry";
import publishEntry from "./publishEntry";
import { revalidateTag } from "next/cache";

const createReaction = async (
  type: string,
  postId: string,
  authorId: string
) => {
  const reactions = await getEntries({
    contentType: "reaction",
    fields: [{ name: "content.sys.id", value: postId }],
  });

  const reaction = reactions.find((reactionItem) =>
    reactionItem.fields.type.includes(type)
  );

  if (reaction) {
    const body = [
      {
        op: "add",
        path: `/fields/users/${process.env.CONTENTFUL_LOCALE}/-`,
        value: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: authorId,
          },
        },
      },
    ];

    const reactionData = await getEntry(reaction.sys.id);

    const response = await fetch(
      `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${postId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
          "Content-Type": "application/json-patch+json",
          "X-Contentful-Content-Type": "post",
          "X-Contentful-Version": `${reactionData.sys.version}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data: EntryProps = await response.json();

    await publishEntry(data);
  } else {
    const reactionData = await createEntry("reaction", {
      name: `${postId}'s Reaction`,
      type: [type],
      content: {
        sys: {
          type: "Link",
          linkType: "Entry",
          id: postId,
        },
      },
      users: [
        {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: authorId,
          },
        },
      ],
    });

    await publishEntry(reactionData);
  }

  revalidateTag("post");
};

export default createReaction;
