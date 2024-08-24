"use client";
import { Button } from "@/components";
import { useRef } from "react";

import submitAction from "./actions";

const CreatePost = () => {
  const ref = useRef<HTMLFormElement>(null);

  //TODO: This approach for resseting the form is throwing the following error "javascript:throw new Error('React form unexpectedly submitted.')"
  const handleSubmit = async (formData: FormData) => {
    await submitAction(formData);
    ref.current?.reset();
  };

  return (
    <div>
      <form ref={ref} action={handleSubmit} className="flex flex-col mb-8">
        <textarea required name="content"></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
