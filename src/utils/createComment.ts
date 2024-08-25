import { EntryProps } from "contentful-management";
import createEntry from "./createEntry";
import { auth } from "@/auth";
import publishEntry from "./publishEntry";
import getEntry from "./getEntry";
import { revalidateTag } from "next/cache";

const createComment = async (
  postId: string,
  comment: string,
  version: number,
  author: EntryProps["fields"]
) => {
  const session = await auth();

  const commentData = await createEntry("comment", {
    title: `${session?.user.name}'s Comment`,
    content: comment,
    author: {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: session?.user?.contentfulId as string,
      },
    },
  });

  await publishEntry(commentData);

  const postData = await getEntry(postId);

  const body = postData.fields.comments
    ? [
        {
          op: "add",
          path: `/fields/comments/${process.env.CONTENTFUL_LOCALE}/-`,
          value: {
            sys: {
              type: "Link",
              linkType: "Entry",
              id: commentData.sys.id,
            },
          },
        },
      ]
    : [
        {
          op: "add",
          path: "/fields/comments",
          value: {
            [process.env.CONTENTFUL_LOCALE as string]: [
              {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: commentData.sys.id,
                },
              },
            ],
          },
        },
      ];

  const response = await fetch(
    `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${postId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
        "Content-Type": "application/json-patch+json",
        "X-Contentful-Content-Type": "post",
        "X-Contentful-Version": `${postData.sys.version}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data: EntryProps = await response.json();

  await publishEntry(data);

  revalidateTag('post')

  return data;
};

export default createComment;
