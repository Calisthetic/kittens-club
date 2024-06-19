"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useRef } from "react"

export type ModalProps = {
  children:ReactNode
  isOpen:boolean
  onClose:() => void
}

export default function Modal(props:ModalProps) {
  const modal = useRef<HTMLDivElement>(null)

  function handleClose(event:any) {
    if (event.target === modal.current) {
      props.onClose()
    }
  }

  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={handleClose}
        transition={{duration: 0.2}} ref={modal}
        className="fixed h-full w-full top-0 left-0 flex items-center justify-center z-50 bg-black/40">
          <div className="py-1 px-1">
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}