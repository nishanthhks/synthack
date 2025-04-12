// lib/auth/options.js
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { Doctor } from "@/models/medical"; // Adjust path as needed
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        await dbConnect();

        // Find doctor by username
        const doctor = await Doctor.findOne({ 
          username: credentials.username 
        });

        if (!doctor) throw new Error("No doctor found with this username");

        const isPasswordValid = await compare(
          credentials.password,
          doctor.password
        );

        if (!isPasswordValid) throw new Error("Invalid password");

        // Return doctor data
        return {
          id: doctor._id.toString(),
          name: doctor.name,
          username: doctor.username,
          email: doctor.email,
          role: "doctor"
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          username: token.username,
          email: token.email,
          role: token.role
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};