import { Button } from "@/components";
import { signInAction } from "./actions";

const SignIn = () => {
  return (
    <form action={signInAction}>
      <Button type="submit" fullWidth>
        SignIn with GitHub
      </Button>
    </form>
  );
};

export default SignIn;
