import { signOut } from "@/auth";
import { Button } from "@/components";

const SignIn = async () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignIn;
