'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData = session.data?.user ;
  let  username = userData?.name || userData?.email ;
  if (username && username.includes(' ')){
    username = username.split(' ')[0];

  }
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-600 font-semibold">
        <Link className="text-primary font-semibold text-5xl" href='/'>
        Fooderu
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact us</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'authenticated' && (
           <>
           <Link href = {'/profile'} className ="whitespace-nowrap"> 
           Hi, {username} 
           </Link>
          <button
           onClick={() => signOut()}
           className="bg-primary rounded-full text-white px-8 py-2">
           Logout
          </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
          <Link href='/login'>Login</Link>
        <Link
        href={'/register'}
        className="bg-primary rounded-full text-white px-8 py-2">
        Register
        </Link>
          </>
        )}
       
      </nav>
    </header>
  );
}
