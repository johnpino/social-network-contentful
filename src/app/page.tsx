import { auth } from "@/auth";
import { CreatePost, Feed, SignIn, SignOut } from "@/components";

export default async function Home() {
  const session = await auth();

  return (
    <div className="container mx-auto">
      <Feed />
      {session ? <CreatePost /> : null}
      <div className="max-w-lg mx-auto mb-4">{session ? <SignOut /> : <SignIn />}</div>
    </div>
  );
}
