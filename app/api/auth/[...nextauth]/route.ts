// import NextAuth from "next-auth"

// // import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID as string,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       })
//   ]
// })

// export { handler as GET, handler as POST }

// import { auth } from "../../../../lib/auth";
// import NextAuth from "next-auth";
// const handler = auth;
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

import { config } from "@/lib/auth";

const handler = NextAuth(config as any);

export { handler as GET, handler as POST };
