import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug logs
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn Callback:", { user, account, profile });
      return true;
    },
    async session({ session, user, token }) {
      console.log("Session Callback:", { session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT Callback:", { token, user, account, profile, isNewUser });
      return token;
    },
  },
};

export default async function handler(req, res) {
  try {
    console.log("OAuth callback received:", req.url);
    await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("Error in NextAuth handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
