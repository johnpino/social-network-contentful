import { signIn, auth, signOut } from "@/auth";
import { CreatePost, Feed, Session } from "@/components";

export default async function Home() {
  const session = await auth();

  return (
    <div className="container mx-auto">
      <Feed />
      {session ? <CreatePost /> : null}
      <Session />
    </div>
  );
}
