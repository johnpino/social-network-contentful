import { Button } from "@/components";
import { signOutAction } from "./actions";

const SignOut = async () => {
  return (
    <form
      action={signOutAction}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOut;
