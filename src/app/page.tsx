import { auth } from "@/auth";
import { CreatePost, Feed, SignIn, SignOut } from "@/components";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <div className="container mx-auto">
      <Feed />
      {session ? <CreatePost /> : null}
      {session ? <SignOut /> : <SignIn />}
    </div>
  );
}
