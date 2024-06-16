"use client"

import AccentButton from "@/components/buttons/accent-button"
import DefaultButton from "@/components/buttons/default-button"
import Link from "next/link"
import { useRef, useState } from "react"
import { Blob } from "buffer";
import fs from "fs";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event:any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData)
    for (let i = 0; i < (fileInputRef.current?.files?.length ?? 0); i++) {
      if (fileInputRef.current?.files) {
        console.log(fileInputRef.current?.files[i])
        // let buffer = fs.readFileSync(fileInputRef.current?.files[i]);
        // let blob = new Blob([buffer]);
        // formData.append("files", fileInputRef.current?.files[i])
      }
    }
    console.log(formData.values().next().value)
    const response = await fetch('/api/cats', { // Замените URL на ваш
      method: 'POST', // Метод запроса
      body: formData, // Тело запроса содержит данные формы
    });
    console.log(response)
    // let xhr = new XMLHttpRequest();
    // // отслеживаем процесс отправки
    // xhr.upload.onprogress = function(event) {
    //   console.log(`Отправлено ${event.loaded} из ${event.total}`);
    // };

    // // Ждём завершения: неважно, успешного или нет
    // xhr.onloadend = function() {
    //   if (xhr.status == 200) {
    //     console.log("Успех");
    //   } else {
    //     console.log("Ошибка " + this.status);
    //   }
    // };

    // xhr.open("POST", "/api/cats");
    // xhr.send(formData);
  }

  return (
    <div className="min-h-[calc(100vh-48px)] w-full flex justify-center">
      <div className="w-full px-2 py-8">
        <form onSubmit={handleSubmit} className="flex *:w-full flex-col items-center gap-y-2">
          <input type="file" onInput={(e:any) => setSelectedFiles(e.target.files)} id="files-input"
          className="hidden" name="files" multiple={true} ref={fileInputRef} accept="image/png, image/jpeg"></input>
          <DefaultButton type="button" isButton click={() => fileInputRef.current?.click()}>Upload</DefaultButton>
          <AccentButton isButton type="submit">Send</AccentButton>
        </form>
        {selectedFiles && selectedFiles.length > 0 ? (
          <div className="text-center">
            <p className="text-lg text-center mt-4">{`Selected files (${selectedFiles?.length ?? 0}):`}</p>
            {
              selectedFiles && Object.keys(selectedFiles).map((item, index) => (
                <p className=" truncate text-sm text-nowrap" key={index}>{selectedFiles[index].name}</p>
              ))
            }
          </div>
        ) : null}
      </div>
    </div>
  )
}