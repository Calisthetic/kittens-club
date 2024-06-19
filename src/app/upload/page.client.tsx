"use client"

import AccentButton from "@/components/buttons/accent-button"
import DefaultButton from "@/components/buttons/default-button"
import ModalError from "@/components/modal-error"
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState } from "react"

export default function UploadPage({userName}:{userName:string|null|undefined}) {
  const [selectedFiles, setSelectedFiles] = useState<FileList>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event:any) {
    if (!userName) {
      setErrorText('Failed to determine user')
      return
    }
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('username', userName)

    await fetch('/api/cats', {
      method: 'POST',
      body: formData,
    }).then(res => {
      if (res.ok) {
        fileInputRef.current!.value = ""
        nameInputRef.current!.value = ""
        setSelectedFiles(undefined)
        return res.json()
      } else {
        throw new Error()
      }
    }).catch(() => setErrorText('Failed to upload images'));
  }

  const [errorText, setErrorText] = useState('')
  
  return (
    <div className="min-h-[calc(100vh-48px)] w-full flex justify-center">
      <div className="w-full px-2 py-8">
        <form onSubmit={handleSubmit} className="flex *:w-full flex-col items-center gap-y-2">
          <label className="block text-sm sm:text-base mt-2 font-medium max-w-80 leading-6">
            Cat name (if exists):
            <input name="cat_name" type="text" ref={nameInputRef}
            className="block w-full px-2 py-1.5 border text-sm sm:text-base sm:leading-6 
            text-black rounded-md bg-white border-border" />
          </label>
          <label className="flex items-center cursor-pointer max-w-80 mb-4">
            <input type="checkbox" name="is_public" className="sr-only peer" defaultChecked/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 
            after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-icon"></div>
            <span className="ms-3 text-sm font-medium">Make it public</span>
          </label>
          <input type="file" onInput={(e:any) => setSelectedFiles(e.target.files)} id="files-input"
          className="hidden" name="files" multiple={true} ref={fileInputRef} accept="image/png, image/jpeg"></input>
          <DefaultButton type="button" isButton click={() => fileInputRef.current?.click()}>Upload</DefaultButton>
          <AccentButton isButton type="submit">Send</AccentButton>
        </form>
        <AnimatePresence>
          {selectedFiles && selectedFiles.length > 0 ? (
            <div className="text-center">
              <motion.p initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
              className="text-lg text-center mt-4">{`Selected files (${selectedFiles?.length ?? 0}):`}</motion.p>
              {selectedFiles && Object.keys(selectedFiles).map((item, index) => (
                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                className="truncate text-sm text-nowrap" key={index}>{selectedFiles[index].name}</motion.p>
              ))}
            </div>
          ) : null}
        </AnimatePresence>
      </div>

      <ModalError close={() => setErrorText('')} text={errorText}></ModalError>
    </div>
  )
}