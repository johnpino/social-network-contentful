import { signIn, auth, signOut } from "@/auth";
import { CreatePost, Feed, Session } from "@/components";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid justify-center justify-items-center">
      <Feed />
      {session ? <CreatePost /> : null}
      <Session />
    </div>
  );
}
