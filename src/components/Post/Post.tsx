import { EntryProps } from "contentful-management";
import { ReactNode } from "react";
import Image from "next/image";
import moment from "moment";
import { Button } from "@/components";
import { submitCommentAction } from "./actions";

type PostProps = {
  id: string;
  version: number;
  author: EntryProps["fields"];
  children: ReactNode;
  comments?: Array<EntryProps["fields"]>;
  createdAt: string;
};

const Post = (props: PostProps) => {
  const submitCommentHandler = submitCommentAction.bind(null, props.id, props.version, props.author)

  return (
    <div className="border rounded-md border-slate-400">
      <div className="p-4 flex gap-4 items-center">
        <Image
          className="rounded-full h-fit"
          src={props.author.image}
          width={40}
          height={40}
          alt={`${props.author.name} Profile Photo`}
        />
        <div>
          <div className="text-sm font-bold">{props.author.name}</div>
          <div className="text-xs italic">
            {moment(props.createdAt).fromNow()}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">{props.children}</div>
      {props.comments && (
        <>
          <hr className="border-slate-300" />
          <div className="p-4">
            <div className="text-sm mb-4">Comments</div>
            {props.comments &&
              props.comments.map((comment) => (
                <div className="flex gap-4" key={comment.sys.id}>
                  <div className="shrink-0">
                    <Image
                      className="rounded-full h-fit"
                      src={comment.fields.author.fields.image}
                      width={25}
                      height={25}
                      alt={`${props.author.name} Profile Photo`}
                    />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 basis-full">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-bold">
                        {comment.fields.author.fields.name}
                      </div>
                      <div className="text-xs">
                        {moment(comment.sys.createdAt).fromNow()}
                      </div>
                    </div>
                    <div className="text-sm">{comment.fields.content}</div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      <hr className="border-slate-300" />
      <div className="flex gap-4 p-4">
        <Image
          className="rounded-full h-fit"
          src={props.author.image}
          width={25}
          height={25}
          alt={`${props.author.name} Profile Photo`}
        />
        <form action={submitCommentHandler} className="flex w-full gap-2 items-start">
          <textarea className="resize-none w-full p-2" placeholder="Comment..." name="comment" id="comment" required></textarea>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Post;
