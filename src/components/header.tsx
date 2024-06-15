"use client"

import Sidebar from "./sidebar/sidebar";
import SidebarButton from "./sidebar/sidebar-button";
import { useEffect, useState } from "react";


export default function Header({username}:{username:string|null}) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(typeof window !== "undefined" && window.innerWidth > 768 ? true : false)
  function ChangeSideBar() {
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      setIsSideBarOpen(true)
    } else {
      setIsSideBarOpen(false)
    }
  } 
  useEffect(() => {
    window.addEventListener('resize', ChangeSideBar);

    return () => {
      window.removeEventListener("resize", ChangeSideBar)
    }
  }, [])

  return (
    <>
      <Sidebar isOpen={isSideBarOpen} username={username}></Sidebar>
      <header className="w-full h-12 flex justify-between items-center">
        <div className="block md:hidden">
          <SidebarButton isActive={isSideBarOpen} onClick={() => setIsSideBarOpen(x => !x)}></SidebarButton>
        </div>
        <div>buttons</div>
      </header>
    </>
  )
}