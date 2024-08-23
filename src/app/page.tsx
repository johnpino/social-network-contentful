import { signIn, auth, signOut } from "@/auth";
import { Feed, Session } from "@/components";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid justify-center justify-items-center">
      <Feed />
      <Session />
    </div>
  );
}
