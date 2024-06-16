"use client"

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconClose from "../icons/close";

export default function Sidebar({isOpen, username}:{isOpen:boolean, username:string|null}) {
  const [isAdOpen, setIsAdOpen] = useState(true)

  const links = [
    {
      icon: (
        // <svg className="w-5 h-5 sm:w-6 sm:h-6 !stroke-none" 
        // aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 20">
        //   <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 
        //   0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 
        //   1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 
        //   10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 
        //   1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
        // </svg>
        <svg version="1.1" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6 !fill-none">
          <g fill="none" fillRule="evenodd" stroke="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
          <g id="Group" className="stroke-icon" strokeWidth="2" transform="translate(-3.000000, -2.000000)"><g id="Shape">
          <path d="M4,13.6290102 C4,17.6998955 7.581722,21 12,21 C16.418278,21 20,17.6998955 20,13.6290102 C20,9.06601657 
          16.7787067,5.58282903 14,3.02680759 C12.9949604,3.72073285 12.194921,4.71179699 11.5998818,6 C11.0048426,7.28820301 
          10.6266833,8.83823365 10.4654037,10.6500919 C9.68167743,10.5010721 8.99572206,10.1409349 8.40753764,9.56968045 
          C7.81935321,8.99842598 7.24023749,8.16826044 6.67019048,7.07918383 C5.19978381,9.12135077 4,11.4541409 4,13.6290102 Z"/>
          <path d="M16.0507188,14 C15.8052829,15.5720506 14.572049,16.8052925 13,17.0507384"/></g></g></g>
        </svg>
      ),
      path: "/",
      text: "New"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 !fill-none">
          <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none"
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          x1="16.511" x2="22" y1="16.511" y2="22"></line>
        </svg>
      ),
      path: "/search",
      text: "Search"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 !stroke-none">
          <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512
          2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 
          2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 
          1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 
          2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 
          7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 
          0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 
          4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
        </svg>
      ),
      path: "/liked",
      text: "Liked",
      isAuthRequired: true
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 !fill-none stroke-2">
          <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 
          21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
        </svg>
      ),
      path: "/favorites",
      text: "Favorites",
      isAuthRequired: true
    },
    {
      icon: (
        <svg fill="none" strokeWidth="1.5" className="w-5 h-5 sm:w-6 sm:h-6 !fill-none"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" 
          strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" 
          strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      path: "/" + username,
      text: "Profile",
      isAuthRequired: true
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 !fill-none">
          <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 
          4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 
          2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" 
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
          <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
        </svg>
      ),
      path: "/upload",
      text: "Upload",
      isAuthRequired: true
    },
  ]
  
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <AnimatePresence>
      {(isOpen && isClient) && (
        <motion.div suppressHydrationWarning initial={{transform: "translateX(-256px)"}} animate={{transform: "translateX(0px)"}}
        exit={{transform: "translateX(-256px)"}} transition={{damping: 24, stiffness: 300}} id="main-sidebar" 
        className="fixed top-12 left-0 z-30 w-56 sm:w-64 h-screen transition-transform border-border bg-background" aria-label="Sidebar">
          <div className="h-full font-medium text-sm sm:text-base px-3 pb-4 overflow-y-auto">
            <ul className="pt-1 sm:pt-3 space-y-1">
              {
                links.map((item, index:number) => item.isAuthRequired && !username ? (
                  <motion.li key={index} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                  transition={{delay: (0.02 * (index + 1)), stiffness: 300, damping: 24}}>
                    <div className="flex items-center p-1.5 sm:p-2 transition-all
                    rounded-lg hover:bg-background-hover opacity-40">
                      {item.icon}
                      <span className="flex-1 ml-3 whitespace-nowrap">{item.text}</span>
                    </div>
                  </motion.li>
                ) : (
                  <motion.li key={index} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                  transition={{delay: (0.02 * (index + 1)), stiffness: 300, damping: 24}}>
                    <Link href={item.path} className="flex items-center p-1.5 sm:p-2 transition-all
                    rounded-lg hover:bg-background-hover">
                      {item.icon}
                      <span className="flex-1 ml-3 whitespace-nowrap">{item.text}</span>
                    </Link>
                  </motion.li>
                ))
              }
              <li className="w-full h-0.5"></li>
              <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
              transition={{delay: 0.2, stiffness: 300, damping: 24}}
              className="w-full h-[1px] bg-border rounded"></motion.li>
              <li className="w-full h-0.5"></li>
              {
                username === "admin" ? (
                  <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.2, stiffness: 300, damping: 24}}>
                    <Link href="/verify" className="flex items-center p-1.5 sm:p-2 transition-all
                    rounded-lg hover:bg-background-hover">
                      <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 !stroke-none">
                        <path d="M10.7905 15.17C10.5905 15.17 10.4005 15.09 10.2605 14.95L7.84055 12.53C7.55055 12.24
                        7.55055 11.76 7.84055 11.47C8.13055 11.18 8.61055 11.18 8.90055 11.47L10.7905 13.36L15.0905
                        9.06003C15.3805 8.77003 15.8605 8.77003 16.1505 9.06003C16.4405 9.35003 16.4405 9.83003 16.1505
                        10.12L11.3205 14.95C11.1805 15.09 10.9905 15.17 10.7905 15.17Z"/>
                        <path d="M12.0009 22.75C11.3709 22.75 10.7409 22.54 10.2509 22.12L8.67086 20.76C8.51086 20.62
                        8.11086 20.48 7.90086 20.48H6.18086C4.70086 20.48 3.50086 19.28 3.50086 17.8V16.09C3.50086
                        15.88 3.36086 15.49 3.22086 15.33L1.87086 13.74C1.05086 12.77 1.05086 11.24 1.87086 10.27L3.22086
                        8.68C3.36086 8.52 3.50086 8.13 3.50086 7.92V6.2C3.50086 4.72 4.70086 3.52 6.18086 3.52H7.91086C8.12086 
                        3.52 8.52086 3.37 8.68086 3.24L10.2609 1.88C11.2409 1.04 12.7709 1.04 13.7509 1.88L15.3309 3.24C15.4909 
                        3.38 15.8909 3.52 16.1009 3.52H17.8009C19.2809 3.52 20.4809 4.72 20.4809 6.2V7.9C20.4809 8.11 20.6309 
                        8.51 20.7709 8.67L22.1309 10.25C22.9709 11.23 22.9709 12.76 22.1309 13.74L20.7709 15.32C20.6309 15.48 
                        20.4809 15.88 20.4809 16.09V17.79C20.4809 19.27 19.2809 20.47 17.8009 20.47H16.1009C15.8909 20.47 15.4909 
                        20.62 15.3309 20.75L13.7509 22.11C13.2609 22.54 12.6309 22.75 12.0009 22.75ZM6.18086 5.02C5.53086 5.02 
                        5.00086 5.55 5.00086 6.2V7.91C5.00086 8.48 4.73086 9.21 4.36086 9.64L3.01086 11.23C2.66086 11.64 2.66086 
                        12.35 3.01086 12.76L4.36086 14.35C4.73086 14.79 5.00086 15.51 5.00086 16.08V17.79C5.00086 18.44 5.53086 
                        18.97 6.18086 18.97H7.91086C8.49086 18.97 9.22086 19.24 9.66086 19.62L11.2409 20.98C11.6509 21.33 12.3709 
                        21.33 12.7809 20.98L14.3609 19.62C14.8009 19.25 15.5309 18.97 16.1109 18.97H17.8109C18.4609 18.97 18.9909 
                        18.44 18.9909 17.79V16.09C18.9909 15.51 19.2609 14.78 19.6409 14.34L21.0009 12.76C21.3509 12.35 21.3509 
                        11.63 21.0009 11.22L19.6409 9.64C19.2609 9.2 18.9909 8.47 18.9909 7.89V6.2C18.9909 5.55 18.4609 5.02 17.8109 
                        5.02H16.1109C15.5309 5.02 14.8009 4.75 14.3609 4.37L12.7809 3.01C12.3709 2.66 11.6509 2.66 11.2409 3.01L9.66086 
                        4.38C9.22086 4.75 8.48086 5.02 7.91086 5.02H6.18086Z"/>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">Verify</span>
                    </Link>
                  </motion.li>
                ) : null
              }
              <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
              transition={{delay: 0.2, stiffness: 300, damping: 24}}>
                <Link href="/help" className="flex items-center p-1.5 sm:p-2 transition-all
                rounded-lg hover:bg-background-hover">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><g>
                    <path d="M12 3c-5 0-9 4-9 9 0 1.8.6 3.6 1.6 5.1l-1.4 2.4c-.2.3-.2.7 0 1s.4.5.8.5h8c5 
                    0 9-4 9-9s-4-9-9-9zm0 16H5.8l.9-1.5c.2-.4.2-.8-.1-1.1C5.6 15.2 5 13.6 5 12c0-3.9 
                    3.1-7 7-7s7 3.1 7 7-3.1 7-7 7z"></path>
                    <path d="M12.1 7.3H12c-1 0-1.9.5-2.4 1.3-.4.5-.3 1.1.2 1.4.5.3 1.1.2 1.4-.3.2-.3.5-.4.8-.4h.1c.5 
                    0 .9.4.9.9 0 .4-.3.8-.6.9l-.7.2c-.4.1-.7.5-.7.9v.8c0 .6.4 1 1 1 .5 
                    0 1-.4 1-.9 1.2-.4 2-1.5 2-2.8 0-1.6-1.3-3-2.9-3z"></path><circle cx="12" cy="16" r="1"></circle></g>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Help</span>
                </Link>
              </motion.li>
              {
                username ? (
                  <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.2, stiffness: 300, damping: 24}}>
                    <Link href="/auth/sign-out" className="flex items-center p-1.5 sm:p-2 transition-all
                    rounded-lg hover:bg-background-hover">
                      <svg enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6 stroke-none">
                        <g><path d="M15,30H2V2h13c0.552,0,1-0.448,1-1s-0.448-1-1-1H1C0.448,0,0,0.448,0,1v30c0,0.552,
                        0.448,1,1,1h14 c0.552,0,1-0.448,1-1S15.552,30,15,30z"/>
                        <path d="M31.71,15.302l-6.9-6.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l5.2,5.275 
                        H8.003c-0.552,0-1,0.452-1,1.01c0,0.558,0.448,1.01,1,1.01h20.593l-5.2,5.275c-0.391,0.395-0.391,1.034,0,1.428   
                        c0.391,0.395,1.024,0.395,1.414,0l6.899-6.999C32.095,16.341,32.099,15.69,31.71,15.302z"/></g><g/><g/><g/><g/><g/><g/>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
                    </Link>
                  </motion.li>
                ) : (
                  <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.2, stiffness: 300, damping: 24}}>
                    <Link href="/auth/sign-in" className="flex items-center p-1.5 sm:p-2 transition-all
                    rounded-lg hover:bg-background-hover">
                      <svg enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6 stroke-none">
                        <g><path d="M31,0H17c-0.552,0-1,0.448-1,1s0.448,1,1,1h13v28H17c-0.552,0-1,0.448-1,1s0.448,1,1,1h14   
                        c0.552,0,1-0.448,1-1V1C32,0.448,31.552,0,31,0z"/>
                        <path d="M16.393,22.3c-0.391,0.395-0.391,1.034,0,1.428c0.391,0.395,1.024,0.395,1.414,0l6.899-6.999   
                        c0.385-0.389,0.389-1.04,0-1.429l-6.9-6.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l5.2,5.275H1   
                        c-0.552,0-1,0.452-1,1.01c0,0.558,0.448,1.01,1,1.01h20.593L16.393,22.3z"/></g><g/><g/><g/><g/><g/><g/>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">Sign in</span>
                    </Link>
                  </motion.li>
                )
              }
            </ul>

            {/* Banner */}
            <AnimatePresence>
              {isAdOpen === true && (
                <motion.div initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 1}} 
                transition={{delay: 0.12, stiffness: 300, damping: 24}} exit={{x: -1000, opacity: 0}}
                className="p-2 sm:p-4 mt-4 sm:mt-6 transition rounded-lg bg-background-second 
                text-sm shadow-shadow">
                  <div className="flex items-center mb-3 justify-between">
                    <div className="font-semibold mr-2 px-2 py-0.5 rounded bg-accent">{username ? "New!" : "Info"}</div>
                    <button onClick={() => {setIsAdOpen(false)}} type="button" id="cloase-ad" aria-label="Close ad"
                    className="ml-auto sm:-mx-1.5 -my-1.5
                    justify-center items-center w-6 h-6 text-textLight rounded-lg transition-all p-1 inline-flex
                    hover:bg-background-hover">
                      <IconClose className="w-2.5 h-2.5"></IconClose>
                    </button>
                  </div>
                  {
                    username ? (
                      <>
                        <p className="mb-2 sm:mb-3">
                          Prewiew new feature with <u>the best</u> posts! 
                          Check the main page using the button below.
                        </p>
                        <Link href="/" onClick={() => {setIsAdOpen(false)}} 
                        className="text-button hover:text-button-hover underline font-medium transition-colors">
                          Try new feature now
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="mb-2 sm:mb-3">
                          Unlock <u>all features</u> now! 
                          Log in to your account and use all the features of the service.
                        </p>
                        <Link href="/auth/sign-in" onClick={() => {setIsAdOpen(false)}} 
                        className="text-button hover:text-button-hover underline font-medium transition-colors">
                          Sign in
                        </Link>
                      </>
                    )
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}