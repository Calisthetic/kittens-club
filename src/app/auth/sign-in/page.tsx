"use client"

import AccentButton from "@/components/buttons/accent-button";
import { SignIn } from "@/lib/auth-action";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignInPage() {
  //const session = await auth()
  //console.log(session
  const passwordRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)

  const [isRedirect, setIsRedirect] = useState(false)
  useEffect(()=>{
    if (isRedirect)
      redirect("/")
  },[isRedirect])

  return (
    <div className="flex h-full sm:w-auto min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:max-w-sm w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Link href={"/"}>home</Link>
          <h2 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
        </div>

        <form action={(formData) => {
          SignIn(formData).then(() => {setIsRedirect(true)}).catch((error) => console.log(error))
        }}
        className="w-full flex flex-col items-center *:w-full">
          <label className="block text-sm sm:text-base mt-2 font-medium leading-6">
            Username
            <input name="username" type="username" ref={usernameRef}
            className="block w-full px-2 py-1.5 border text-sm sm:text-base sm:leading-6 
          text-black rounded-md bg-white border-border" />
          </label>
          <label className="block text-sm sm:text-base mt-2 font-medium leading-6 mb-4">
            Password
            <input name="password" type="password" ref={passwordRef}
            className="block w-full px-2 py-1.5 border text-sm sm:text-base sm:leading-6 
          text-black rounded-md bg-white border-border" />
          </label>
          <AccentButton isButton type="submit"><span>Sign In</span></AccentButton>
        </form>

        <div className="mt-6 text-center text-sm text-textLight dark:text-textDark ">
          <span className='opacity-70'>Not a member?</span>
          <Link href="/auth/signup" className="font-semibold leading-6 text-buttonLight dark:text-buttonDark 
          hover:text-buttonHoverLight dark:hover:text-buttonHoverDark ml-1">Join now!</Link>
        </div>
      </div>
    </div>
  )
}