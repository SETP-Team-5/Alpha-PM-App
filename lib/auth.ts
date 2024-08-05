import { connectDB } from "@/lib/utils";
import User from "../models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     credentials({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User.findOne({
//           email: credentials?.email,
//         }).select("+password");

//         if (!user) throw new Error("Wrong Email! Please create an account.");

//         const passwordMatch = await bcrypt.compare(
//           credentials!.password,
//           user.password
//         );

//         if (!passwordMatch)
//           throw new Error("Wrong Password! Please try again.");
//         console.log(user);
//         return user;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
// };

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email! Please create an account.");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch)
          throw new Error("Wrong Password! Please try again.");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        //@ts-ignore
        session.user._id = token._id;
      }
      return session;
    }, // rest of your config
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
