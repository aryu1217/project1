import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      //로그인 성공시 항상 홈으로 리다이렉트
      return `${baseUrl}/home`;
    },
  },
});

export { handler as GET, handler as POST };
