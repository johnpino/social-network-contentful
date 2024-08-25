import { signIn } from "@/auth";
import { Button } from "@/components";

const SignIn = async () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit">SignIn with GitHub</Button>
    </form>
  );
};

export default SignIn;
