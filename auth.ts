import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
        //TODO: Perform logic to store user in Contentful

        return true
    }
  }
});
