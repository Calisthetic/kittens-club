"use server"

import { auth } from "@/lib/auth";;
import { Suspense } from "react";
import TagsPage from "./page.client";

export default async function Page() {
  const session = await auth()

  return (
    <Suspense fallback={<div></div>}>
      <TagsPage userName={session?.user?.name}></TagsPage>
    </Suspense>
  )
}