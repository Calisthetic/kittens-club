"use server"

import { auth } from "@/lib/auth";
import SearchPage from "./page.client";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth()

  return (
    <Suspense fallback={<div></div>}>
      <SearchPage userName={session?.user?.name}></SearchPage>
    </Suspense>
  )
}