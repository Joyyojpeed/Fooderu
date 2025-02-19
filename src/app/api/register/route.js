import { User } from "../../../models/user";
import mongoose from "mongoose";

export async function POST(req) {
    const body = await req.json();

    try {
        await mongoose.connect(process.env.MONGO_URL);

        // Check for existing email
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email is already registered" }), { status: 400 });
        }

        const createdUser = await User.create(body); 
        return new Response(JSON.stringify(createdUser), { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return new Response(JSON.stringify({ error: "Email is already registered" }), { status: 400 });
        }
        console.error('Error creating user:', error.message);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
