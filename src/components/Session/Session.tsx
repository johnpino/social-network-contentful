import { signIn, auth, signOut } from "@/auth";

const Session = async () => {
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
};

export default Session;
