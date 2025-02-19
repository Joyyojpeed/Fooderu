import mongoose from "mongoose";
import NextAuth from "next-auth";
import { User } from '@/models/user';
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      
      },
      
      
      async authorize(credentials, req) {

        console.log("🔍 Received Credentials:", credentials);
        console.log("🔍 Request Body:", req.body);
      
        if (!credentials || !credentials.email || !credentials.password) {
          console.log("🚨 Missing email or password!");
          return null;
        }

        const email = credentials?.email;
        const password = credentials?.password;

        console.log("Email from credentials:", email);

        try { 
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL);
          }
          console.log("MongoDB connection status:", mongoose.connection.readyState);

          console.log("Querying database for email:", email);

          // Case-insensitive query to find the user by email
          const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

          // Log the result of the query
          console.log("Found user:", user);
          
          if (!user) {
            console.log("User not found");
            return null;
          }

          // Compare password with the hashed password in the database
          const passwordOk = bcrypt.compareSync(password, user.password);
          console.log({ passwordOk });

          if (passwordOk) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
            };
          } else {
            console.log("Invalid password");
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async signIn({ account, profile }) {
      console.log("🔍 Google Profile Data:", profile);
  
      await mongoose.connect(process.env.MONGO_URL);
  
      if (account.provider === "google") {
        let existingUser = await User.findOne({ email: profile.email });
  
        if (!existingUser) {
          console.log("⚠️ Google user not found, creating new user...");
  
          existingUser = await User.create({
            email: profile.email,
            name: profile.name, // Store the Google name
            isGoogleUser: true, // Set the flag for Google users
          });
  
          console.log("✅ New Google User Created:", existingUser);
        } else if (!existingUser.name) {
          // Update name if it's missing
          existingUser.name = profile.name;
          await existingUser.save();
          console.log("🔄 Updated Google User's Name:", existingUser);
        } else {
          console.log("✅ Existing Google User Found:", existingUser);
        }
  
        return true;
      }
  
      return true;
    },
  
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Persist updated name
      }
  
      // Fetch updated user details from MongoDB to ensure the latest name is stored
      const updatedUser = await User.findOne({ email: token.email });
  
      if (updatedUser) {
        token.name = updatedUser.name; // Ensure latest name is stored in token
      }
  
      return token;
    },
  
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name; // Ensure name is updated in session
      }
      return session;
    },
  },
  
  session: {
    strategy: "jwt",
  },
  
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
