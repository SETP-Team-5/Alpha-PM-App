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

import { authOptions } from "../../../../lib/auth";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
