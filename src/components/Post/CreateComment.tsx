"use client";

import { EntryProps } from "contentful-management";
import Image from "next/image";
import { Button } from "@/components";
import { submitCommentAction } from "./actions";
import { useRef } from "react";

type CreateCommentProps = {
  author: EntryProps["fields"];
  postId: string;
  version: number;
};

const CreateComment = (props: CreateCommentProps) => {
  const ref = useRef<HTMLFormElement>(null);

  //TODO: This approach for resseting the form is throwing the following silent error "javascript:throw new Error('React form unexpectedly submitted.')"
  const handleSubmit = async (formData: FormData) => {
    await submitCommentAction(
      props.postId,
      props.version,
      props.author,
      formData
    );
    ref.current?.reset();
  };

  return (
    <>
      <hr className="border-slate-300" />
      <div className="flex gap-4 p-4">
        <Image
          className="rounded-full h-fit"
          src={props.author.image}
          width={25}
          height={25}
          alt={`${props.author.name} Profile Photo`}
        />
        <form
          ref={ref}
          action={handleSubmit}
          className="flex w-full gap-2 items-start"
        >
          <textarea
            className="resize-none w-full p-2"
            placeholder="Comment..."
            name="comment"
            id="comment"
            required
          ></textarea>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </>
  );
};

export default CreateComment;
