"use client"

import DefaultButton from "./buttons/default-button"
import Modal from "./modal"

export default function ModalError({text, close}:{text:string, close:() => void}) {
  return (
    <Modal isOpen={text.length > 0} onClose={close}>
      <div className='py-3 px-6 rounded-lg bg-background relative flex flex-col items-center w-[300px]'>
        <h1 className=' text-center font-medium whitespace-normal'>{text}</h1>
        <div className="flex flex-col mt-2">
          <DefaultButton type="button" isButton={true} click={close}>Ok</DefaultButton>
        </div>
      </div>
    </Modal>
  )
}