"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setuserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();

    setCreatingUser(true);
    setError(false);
    setuserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setuserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary font-semibold text-4xl mb-4">
        Register
      </h1>

      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can.{" "}
          <Link className="underline font-semibold text-blue-600" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center font-bold">
          An Error has occured. <br />
          Please try again.
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button type="submit" disabled={creatingUser}>
          Register
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>

        <button
        type="button" 
        onClick={() => signIn('google', {callbackUrl:'/'})}
        className="flex gap-4 justify-center">
          <Image
            src={"/Google.png"}
            alt={"login with google"}
            width={24}
            height={24}
          />
          Login with Google
        </button>
        <div className="text-center text-gray-500 my-4 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}
