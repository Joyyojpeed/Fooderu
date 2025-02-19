"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl:'/' });

    setLoginInProgress(false);
  }

  async function handleGoogleSignIn() {
    try {
      console.log("Signing in with Google...");
      await signIn("google", {callbackUrl:'/'});
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary font-semibold text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex gap-4 justify-center"
        >
          <Image
            src={"/Google.png"}
            alt={"login with google"}
            width={24}
            height={24}
          />
          Login with Google
        </button>
      </form>
    </section>
  );
}
