import { EntryProps } from "contentful-management";
import { ReactNode } from "react";
import Image from "next/image";
import moment from "moment";
import CreateComment from "./CreateComment";
import CreateReaction from "./CreateReaction";

type PostProps = {
  id: string;
  version: number;
  author: EntryProps["fields"];
  children: ReactNode;
  comments?: Array<EntryProps["fields"]>;
  createdAt: string;
};

const Post = (props: PostProps) => {
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
      <CreateReaction author={props.author} postId={props.id} />
      {props.comments && (
        <>
          <hr className="border-slate-300" />
          <div className="p-4">
            <div className="text-sm mb-4">
              Comments{" "}
              <span className="text-xs">({props.comments.length})</span>
            </div>
            <div className="flex flex-col gap-4">
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
          </div>
        </>
      )}
      <CreateComment
        author={props.author}
        postId={props.id}
        version={props.version}
      />
    </div>
  );
};

export default Post;
