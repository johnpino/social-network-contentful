import { signIn, auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  
  return !session ? (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">SignOut</button>
    </form>
  );
}
