import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default async function Providers({children}:{children: ReactNode}) {
  
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}