"use server"

import { auth } from "@/lib/auth";;
import { Suspense } from "react";
import UploadPage from "./page.client";

export default async function Page() {
  const session = await auth()

  return (
    <Suspense fallback={<div></div>}>
      <UploadPage userName={session?.user?.name}></UploadPage>
    </Suspense>
  )
}