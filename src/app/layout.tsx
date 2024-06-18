import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { auth } from "../lib/auth";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";
import { SessionProvider } from "next-auth/react";

const play = Roboto({ weight: "400", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kittens club",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={play.className}>
        <Providers>
          <Header username={session?.user?.name ?? null}></Header>
          <div className="md:ml-64 transition-all duration-400 md:rounded-tl-2xl min-h-[calc(100vh-48px)] bg-background-second">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

