import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // 1. Connect NextAuth to your Postgres database using Prisma
  adapter: PrismaAdapter(prisma),
  
  // 2. Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  // 3. Configure session settings
  session: {
    strategy: "jwt",
  },

  // 4. Inject the user ID from the database into the session so we can use it in our actions
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // @ts-ignore - NextAuth types don't include 'id' on user by default
        session.user.id = token.sub; 
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests (required by App Router)
export { handler as GET, handler as POST };