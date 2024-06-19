"use server"

import { auth } from "@/lib/auth";
import ProfilePage from "./page.client";
import { Suspense } from "react";

export default async function Page({params: {username}}:any) {
  const session = await auth()
  
  return session?.user?.name === username ? (
    <Suspense fallback={<div></div>}>
      <ProfilePage userName={session?.user?.name}></ProfilePage>
    </Suspense>
  ) : (
    <div className="flex justify-center text-xl pt-4">Wrong user</div>
  )
}