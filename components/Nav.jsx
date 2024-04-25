"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn,signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const Nav = () => {

  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
        src="/assets/images/logo.svg"
        width={30}
        height={30}
        alt="Web logo"
        className="object-contain"
        />
        <p className="logo_text">SharePrompts</p>
      </Link>
      {/**desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
            Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
            <Image
            src="/assets/images/logo.svg"
            width={37}
            height={37}
            alt="Profile"
            className="rounded-full cursor-pointer"
            />
            </Link>
            
          </div>
        ):(
          <>
          {/**check if the providers are given and get them NOTe: && means true*/}
          {providers && Object.values(providers).map((provider)=>(
            <button
            type="button"
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className="black_btn"
            >
              SignIn
            </button>
          ))}
          </>
        )}

      </div>
      
      {/**Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
            src="/assets/images/logo.svg"
            alt="Profile Image"
            width={37}
            height={37}
            className="rounded-full"
            onClick={()=> setToggleDropdown((prev)=>!prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                href="/profile"
                onClick={()=>setToggleDropdown(false)}
                className="dropdown_link"
                >
                My Profile
                </Link>
                <Link
                href="/create-prompt"
                onClick={()=>setToggleDropdown(false)}
                className="dropdown_link"
                >
                Create Prompt
                </Link>
                <button
                type="button"
                onClick={()=>{
                  setToggleDropdown(false);
                  signOut();
                }}
                className="mt-5 black_btn w-full"
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider)=>(
            <button
            type="button"
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className="black_btn"
            >
              SignIn
            </button>
          ))}
          </>
        )}

      </div>
    </nav>
  )
}

export default Nav