"use client"

import Link from "next/link";
import { ReactNode } from "react";

interface CommonProps {
  children:ReactNode
}
interface LinkProps extends CommonProps {
  href: string
  isButton: false
}
interface ButtonProps extends CommonProps {
  type: "submit" | "reset" | "button" | undefined
  click?: () => void
  isButton: true
}

export default function DefaultButton(props:LinkProps|ButtonProps) {
  return props.isButton ? (
    <button type={props.type} onClick={props.click ?? (() => {})} 
    className="font-semibold text-foreground transition-colors max-w-min
    border border-border hover:border-foreground-accent hover:bg-foreground-accent 
    rounded-lg text-sm px-8 py-2 text-center text-nowrap">{props.children}</button>
  ) : (
    <Link href={props.href} 
    className="font-semibold text-foreground transition-colors max-w-min
    border border-border hover:border-foreground-accent hover:bg-foreground-accent 
    rounded-lg text-sm px-8 py-2 text-center text-nowrap">{props.children}</Link>
  )
}