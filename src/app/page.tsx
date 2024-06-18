"use server"

import { auth } from "@/lib/auth";
import { Suspense } from "react";
import MainPage from "./page.client";

export default async function Page() {
  const session = await auth()

  return (
    <Suspense fallback={<div></div>}>
      <MainPage userName={session?.user?.name}></MainPage>
    </Suspense>
  )
}