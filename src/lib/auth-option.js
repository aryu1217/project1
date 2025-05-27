import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      return true; // 무조건 로그인 허용
    },

    async session({ session }) {
      const client = await clientPromise;
      const db = client.db();
      const user = await db
        .collection("users")
        .findOne({ email: session.user.email });

      if (user?.nickname) {
        session.user.nickname = user.nickname;
      }

      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/home`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
