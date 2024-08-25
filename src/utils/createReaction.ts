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
  const reactionData = await getEntries({
    contentType: "reaction",
    fields: [
      { name: "content.sys.id", value: postId },
      { name: "type", value: type },
    ],
  });

  const reaction = reactionData[0]

  if (reaction) {
    const userIndex: number | undefined = reaction.fields.users?.findIndex(
      (user: EntryProps) => user.sys.id
    );

    const body =
      userIndex !== undefined
        ? [
            {
              op: userIndex >= 0 ? "remove" : "add",
              path:
                userIndex >= 0
                  ? `/fields/users/${process.env.CONTENTFUL_LOCALE}/${userIndex}`
                  : `/fields/users/${process.env.CONTENTFUL_LOCALE}/-`,
              value: {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: authorId,
                },
              },
            },
          ]
        : [
            {
              op: "add",
              path: "/fields/users",
              value: {
                [process.env.CONTENTFUL_LOCALE as string]: [
                  {
                    sys: {
                      type: "Link",
                      linkType: "Entry",
                      id: authorId,
                    },
                  },
                ],
              },
            },
          ];

    const reactionData = await getEntry(reaction.sys.id);

    const response = await fetch(
      `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${reactionData.sys.id}`,
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
