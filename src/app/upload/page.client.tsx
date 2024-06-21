"use client"

import AccentButton from "@/components/buttons/accent-button"
import DefaultButton from "@/components/buttons/default-button"
import ModalError from "@/components/modal-error"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

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
  

  // drag state
  const [dragActive, setDragActive] = useState(false);
  
  // handle drag events
  const handleDrag = function(e:any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  function handleFile(files:any) {
    if (fileInputRef.current)
      fileInputRef.current.files = files
    setSelectedFiles(files)
  }
  // triggers when file is dropped
  const handleDrop = function(e:any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  useEffect(()=>{
    document.addEventListener('dragenter', handleDrag)
    return () => {
      document.removeEventListener('dragenter', handleDrag)
    }
  },[])
  
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
          <label className="flex items-center cursor-pointer max-w-80">
            <input type="checkbox" name="is_public" className="sr-only peer" defaultChecked/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 
            after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-icon"></div>
            <span className="ms-3 text-sm font-medium">Make it public</span>
          </label>
          <input type="file" onInput={(e:any) => setSelectedFiles(e.target.files)} id="files-input"
          className="hidden" name="files" multiple={true} ref={fileInputRef} accept="image/png, image/jpeg"></input>
          <button type="button" className="w-full border-border hover:border-icon border-dotted border-2 
          py-6 my-2 max-w-80 rounded-lg transition-[border-color]" 
          onClick={() => fileInputRef.current?.click()}>
            <p>Drag and drop your files here or</p>
            <p>Upload a file in (click here)</p>
          </button>
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

      <AnimatePresence>
      { dragActive && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.2}}
        id="drag-file-element" className="w-[100vw] z-50 h-[100vh] top-0 left-0 absolute bg-black/60
        flex items-center justify-center text-3xl font-medium" 
        onDragEnter={handleDrag} onDragLeave={handleDrag} 
        onDragOver={handleDrag} onDrop={handleDrop}>
          Yeah, drop here
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}