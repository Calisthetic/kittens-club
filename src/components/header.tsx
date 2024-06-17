"use client"

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar/sidebar";
import SidebarButton from "./sidebar/sidebar-button";
import { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "./theme-swither";


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




  const pathname = usePathname();
  const isFirstLoad = useRef(true)
  useEffect(() => {
    if (!isFirstLoad)
      setIsSideBarOpen(false)
    else
    isFirstLoad.current = false
  }, [pathname]);

  useEffect(()=>{
    document.addEventListener("touchstart", startTouch, false);
    document.addEventListener("touchend", endTouch, false);
    document.addEventListener("touchmove", moveTouch, false);

    return () => {
      document.addEventListener("touchstart", startTouch, false);
      document.addEventListener("touchend", endTouch, false);
      document.addEventListener("touchmove", moveTouch, false);
    }
  }, [isSideBarOpen])

  // Swipe Up / Down / Left / Right
  const initialX = useRef<number|null>(null);
  const initialY = useRef<number|null>(null);

  function startTouch(e:any) {
    initialX.current = e.touches[0].clientX;
    initialY.current = e.touches[0].clientY;
  };

  function endTouch(e:any) {
    initialX.current = null
    initialY.current = null
  };

  function moveTouch(e:any) {
    if (initialX.current === null || initialY.current === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var diffX = initialX.current - currentX;
    var currentY = e.touches[0].clientY;
    var diffY = initialY.current - currentY;

    if (diffY < 80) {
      if (diffX > 80) {
        // swiped left
        if (isSideBarOpen)
          setIsSideBarOpen(false)
      } else if (diffX < -80) {
        // swiped right
        if (!isSideBarOpen)
          setIsSideBarOpen(true)
      }
    }
  };

  return (
    <>
      <Sidebar isOpen={isSideBarOpen} username={username} close={() => setIsSideBarOpen(false)}></Sidebar>
      <header className="w-full z-20 h-12 px-3 flex justify-between items-center">
        <div className="block md:hidden h-8">
          <SidebarButton isActive={isSideBarOpen} onClick={() => setIsSideBarOpen(x => !x)}></SidebarButton>
        </div>
        <ThemeSwitcher></ThemeSwitcher>
      </header>
    </>
  )
}