"use server"

import { auth } from "@/lib/auth";
import TagsPage from "./page.client";
import { Suspense } from "react";

export default async function Page({params: {id}}:any) {
  const session = await auth()
  
  return (
    <Suspense fallback={<div></div>}>
      <TagsPage userName={session?.user?.name} catId={id}></TagsPage>
    </Suspense>
  )
}