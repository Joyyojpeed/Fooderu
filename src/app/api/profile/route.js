import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/user";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    
    console.log("Session Data:", session);
    
    if (!session?.user?.email) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    console.log("Updating user with email:", email);

    if ('name' in data) {
        await User.updateOne({ email }, { name: data.name });
    }

    return Response.json(true);
}
