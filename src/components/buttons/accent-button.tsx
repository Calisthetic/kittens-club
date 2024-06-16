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

export default function AccentButton(props:LinkProps|ButtonProps) {
  return props.isButton ? (
    <button type={props.type} onClick={props.click ?? (() => {})} className="p-[3px] relative max-w-min">
      <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-red-500 to-rose-800 rounded-lg">
        <div className="px-8 py-2 w-fit rounded-[6px] font-semibold hover:text-background-secondary bg-background 
        relative group transition duration-200 hover:bg-transparent">
          {props.children}
        </div>
      </div>
    </button>
  ) : (
    <Link href={props.href} className="p-[3px] relative max-w-min">
      <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-red-500 to-rose-800 rounded-lg">
        <div className="px-8 py-2 w-fit rounded-[6px] font-semibold hover:text-background-secondary bg-background 
        relative group transition duration-200 hover:bg-transparent">
          {props.children}
        </div>
      </div>
    </Link>
  )
}