import handleUserAccount from "@/utils/handleUserAccount";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
        if(user.email) handleUserAccount(user)

        return true
    }
  }
});
