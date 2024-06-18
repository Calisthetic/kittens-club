import { auth } from "@/lib/auth";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default async function Providers({children}:{children: ReactNode}) {
  const session = await auth();
  
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}