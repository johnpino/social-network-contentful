import { signIn, auth, signOut } from "@/auth";
import { Button } from '@/components'

const Session = async () => {
  const session = await auth();

  return !session ? (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit">SignIn with GitHub</Button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">SignOut</Button>
    </form>
  );
};

export default Session;
