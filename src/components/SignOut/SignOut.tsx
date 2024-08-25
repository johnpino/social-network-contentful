import { Button } from "@/components";
import { signOutAction } from "./actions";

const SignOut = async () => {
  if(typeof window === 'undefined') console.log('this is the server baby')
  return (
    <form
      action={signOutAction}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOut;
