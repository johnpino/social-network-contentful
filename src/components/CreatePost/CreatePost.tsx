"use client";

import { Button } from "@/components";
import { useRef } from "react";

import submitAction from "./actions";

const CreatePost = () => {
  const ref = useRef<HTMLFormElement>(null);

  //TODO: This approach for resseting the form is throwing the following silent error "javascript:throw new Error('React form unexpectedly submitted.')"
  const handleSubmit = async (formData: FormData) => {
    await submitAction(formData);
    ref.current?.reset();
  };

  return (
    <div className="max-w-lg mx-auto">
      <form ref={ref} action={handleSubmit} className="flex flex-col mb-8">
        <textarea
          className="border mb-2 resize-none p-2"
          rows={3}
          required
          name="content"
        ></textarea>
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
