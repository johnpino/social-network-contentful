"use server"

import { auth } from "@/auth";
import createEntry from "@/utils/createEntry";
import publishEntry from "@/utils/publishEntry";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Ref, Reference, RefObject } from "react";

const submitAction = async (formData: FormData) => {
    const session = await auth()

    const data = await createEntry("post", {
      title: `${session?.user?.name}'s Post`,
      content: formData.get("content") as string,
      author: {
        sys: {
          type: "Link",
          linkType: "Entry",
          id: session?.user?.contentfulId as string,
        },
      },
    });

    await publishEntry(data);
    
    redirect("/");
  };

  export default submitAction