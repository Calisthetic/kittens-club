"use server"

import { auth } from "@/lib/auth";;
import { Suspense } from "react";
import LikedPage from "./page.client";

export default async function Page() {
  const session = await auth()

  return (
    <Suspense fallback={<div></div>}>
      <LikedPage userName={session?.user?.name}></LikedPage>
    </Suspense>
  )
}