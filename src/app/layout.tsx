import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { auth } from "../lib/auth";
import Providers from "./providers";

const play = Roboto({ weight: "400", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kittens club",
  description: "Share funny cats for free",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const session = await auth()
  
  return (
    <html lang={locale} suppressHydrationWarning>
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

