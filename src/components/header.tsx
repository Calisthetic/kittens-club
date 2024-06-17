"use client"

import Sidebar from "./sidebar/sidebar";
import SidebarButton from "./sidebar/sidebar-button";
import { useEffect, useRef, useState } from "react";


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

  function startTouch(e:any) {
    initialX.current = e.touches[0].clientX;
  };

  function endTouch(e:any) {
    initialX.current = null
  };

  function moveTouch(e:any) {
    if (initialX.current === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var diffX = initialX.current - currentX;

    if (diffX > 100) {
      // swiped left
      if (isSideBarOpen)
        setIsSideBarOpen(false)
    } else if (diffX < -100) {
      // swiped right
      if (!isSideBarOpen)
        setIsSideBarOpen(true)
    }
  };

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