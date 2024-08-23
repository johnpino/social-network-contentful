import { auth } from "@/auth";
import { Button } from "@/components";
import createEntry from "@/utils/createEntry";
import publishEntry from "@/utils/publishEntry";

const CreatePost = async () => {
  const session = await auth();

  console.log(session)

  const handler = async (formData: FormData) => {
    "use server";

    const data = await createEntry("post", {
      title: `${session?.user?.name}'s Post`,
      content: formData.get("content") as string,
      author: {
        sys: {
            type: 'Link',
            linkType: 'Entry',
            id: session?.user?.contentfulId as string
        }
      }
    });

    await publishEntry(data)
  };

  return (
    <div>
      <form action={handler} className="flex flex-col mb-8">
        <textarea name="content"></textarea>
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
