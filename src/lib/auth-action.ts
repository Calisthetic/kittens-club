'use server'

import { signIn } from "./auth"

export async function SignIn(data:any) {
  return await signIn('credentials', data)
}