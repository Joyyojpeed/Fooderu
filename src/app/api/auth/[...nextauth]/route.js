import mongoose from "mongoose";
import NextAuth from "next-auth";
import { User } from '@/models/user';  // Correct path to User model
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
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
            return null; // If no user is found, return null
          }

          // Compare password with the hashed password in the database
          const passwordOk = bcrypt.compareSync(password, user.password);
          console.log({ passwordOk });

          if (passwordOk) {
            return user; // If passwords match, return the user
          } else {
            console.log("Invalid password");
            return null; // Return null if the password doesn't match
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; // Return null if there is any error
        }
      }
    })
  ],
});

export { handler as GET, handler as POST };
