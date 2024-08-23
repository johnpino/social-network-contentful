import handleUserAccount from "@/utils/handleUserAccount";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        const data = await handleUserAccount(user, profile.node_id as string);
        profile.contentfulId = data;
      }

      return true;
    },
    jwt({ token, user, account, profile }) {
      if (profile) {
        token.id = profile.node_id;
        token.contentfulId = profile.contentfulId;
      }

      return token;
    },
    async session({ session, token }) {
      
      session.user.id = token.id as string;
      session.user.contentfulId = token.contentfulId as string;
      
      return session;
    },
  },
});
