"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Destructure both 'data' and 'status'
  const [userName, setUserName] = useState(""); // Initialize as an empty string
  const [email, setEmail] = useState(""); // State for email

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if unauthenticated
    } else if (status === "authenticated" && session?.user) {
      setEmail(session.user.email); // Set the email when session data is available
      setUserName(session.user.name); // Set the userName when session data is available
    }
  }, [status, session, router]); // Dependency array ensures the effect runs when these values change

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null; // Return nothing while the redirection is in progress
  }

  const userImage = session?.user?.image || "/default-avatar.png"; // Safely access user image

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <form className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                width={250}
                height={250}
                alt="User Avatar"
              />
              <button type="button">Edit</button>
            </div>
          </div>
          <div className="grow">
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)} // Update userName on input change
            />
            <input
              type="email"
              disabled={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email on input change
            />
            <button className="mb-4" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
