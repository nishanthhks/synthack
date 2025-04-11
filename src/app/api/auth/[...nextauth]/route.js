import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions = {
  // Remove PrismaAdapter since it's not installed
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {


        // First check if user is a manager
        let user = await prisma.manager.findUnique({
          where: { username: credentials.username },
        });

        let role = "manager";

        // If not found in managers, check residents
        if (!user) {
          user = await prisma.resident.findUnique({
            where: { username: credentials.username },
          });
          
        }
        console.log(user);

        if (!user) throw new Error("No user found with this username");

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) throw new Error("Invalid password");

        // Return appropriate user data based on role
        return {
         

    });
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.areaCode = user.areaCode;

        if (user.role === "manager") {
          token.address = user.address;
        } else {
          token.adminId = user.adminId;
          token.areaId = user.areaId;
        }

        token.latitude = user.latitude;
        token.longitude = user.longitude;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.areaCode = token.areaCode;

        if (token.role === "manager") {
          session.user.address = token.address;
        } else {
          session.user.adminId = token.adminId;
          session.user.areaId = token.areaId;
        }

        session.user.latitude = token.latitude;
        session.user.longitude = token.longitude;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};