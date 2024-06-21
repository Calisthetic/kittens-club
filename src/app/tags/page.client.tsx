"use client"

import { useEffect, useRef, useState } from "react"
import style from "./tags.module.css"
import Modal from "@/components/modal"
import DefaultButton from "@/components/buttons/default-button"
import Loading from "@/components/loading"
import ImageCatCard from "./image-card"
import AccentButton from "@/components/buttons/accent-button"
import ModalError from "@/components/modal-error"

type Tag = {
  tag_id: number
  tag_name: number
  tag_category_id: number
}
type Cat = {
  favorite_by_user_id?:number
  id: number
  liked_by_user_id?:number
  name: string
  is_public: boolean
}

export default function TagsPage({userName}:{userName:string|undefined|null}) {
  const [selectedTagCategory, setSelectedCategory] = useState<number>()
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [errorText, setErrorText] = useState<string>('')
  const addTagRef = useRef<HTMLInputElement>(null)
  const addCategoryRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const isPublicInputRef = useRef<HTMLInputElement>(null)
  
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [tags, setTags] = useState<any[]|null>()
  const [isUpdate, setIsUpdate] = useState<boolean>(true)
  useEffect(()=>{
    const getTags = async () => {
      await fetch("/api/tags")
      .then(res=>{
        if (res.ok) {
          return res.json()
        } else {
          throw new Error
        }
      })
      .then(data => setTags(data))
      .catch(() => setErrorText('Failed to get tags'))
    }
    getTags()
  }, [isUpdate])

  async function AddTag(tag_category_id:number|undefined, tag_name:string|undefined) {
    if (tag_category_id === undefined || tag_name === undefined) {
      return
    }
    await fetch("api/tags", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tag_category_id,
        tag_name
      })
    }).then(res => {
      if (res.ok) {
        setIsUpdate(x => !x)
      } else {
        throw new Error
      }
    }).catch(() => {
      setErrorText('Failed to add tag')
    })
    setSelectedCategory(undefined)
  }

  async function AddCategory(tag_category_name:string|undefined) {
    if (tag_category_name === undefined) {
      return
    }
    await fetch("api/tag_categories", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tag_category_name
      })
    }).then(res => {
      if (res.ok) {
        setIsUpdate(x => !x)
      } else {
        throw new Error
      }
    }).catch(() => {
      setErrorText('Failed to add tag category')
    })
    setIsAddCategoryModalOpen(false)
  }



  const [isNext, setIsNext] = useState(true)
  const [currentCat, setCurrentCat] = useState<Cat|undefined>()
  const nextCat = useRef()
  useEffect(()=>{
    const getData = async () => {
      await fetch('/api/cats/manage', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userName
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(data => {
        if (data.length === 0)
          setErrorText("The response was recieved, but there's no data on server")
        else
          setCurrentCat(data)
      })
      .catch(() => setErrorText("Failed to get cat"))
    }
    getData()
  }, [])

  useEffect(()=>{
    if (nextCat.current) {
      setCurrentCat(nextCat.current)
    }
    const getData = async () => {
      await fetch('/api/cats/manage', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userName,
          offset: 1
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(data => {
        nextCat.current = data
      })
      .catch(() => setErrorText("Failed to get cat"))
    }
    setSelectedTags([])
    if (nameInputRef.current)
      nameInputRef.current!.value = ''
    getData()
  }, [isNext])

  async function SaveChanges() {
    if (!currentCat || !isPublicInputRef.current || !nameInputRef.current) {
      return
    }
    if (selectedTags.length === 0) {
      setErrorText('Please, add few tags')
      return
    }
    await fetch(`/api/cats/${currentCat.id}/manage`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName,
        is_public: isPublicInputRef.current.value,
        cat_name: nameInputRef.current.value,
        tags: selectedTags
      })
    })
    .then(res => {
      if (res.ok) {
        setIsNext(x => !x)
      } else {
        throw new Error()
      }
    })
    .catch(() => setErrorText("Failed to save changes"))
  }



  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1fr,320px] items-center lg:items-start">
        <div className="w-full flex flex-col justify-center lg:min-h-[calc(100vh-48px)] items-center">
          {currentCat ? (
            <>
              <div className=" lg:max-w-full px-2">
                <ImageCatCard catId={currentCat.id} catName={currentCat.name} userName={userName} 
                liked={currentCat.liked_by_user_id !== null} favorite={currentCat.favorite_by_user_id !== null}></ImageCatCard>
              </div>
              <div className="mt-1">
                <AccentButton isButton type="button" click={SaveChanges}>Next</AccentButton>
              </div>
            </>
          ) : (
            <div className="w-full mt-2 flex justify-center">
              <Loading></Loading>
            </div>
          )}
        </div>
        <div className="w-full h-full flex flex-col items-center">
          {tags ? (
            <div className="max-w-xs h-full min-w-[300px] px-2 py-1 lg:border-l border-border">
              <label className="block text-sm sm:text-base mt-2 font-medium max-w-80 leading-6">
                Cat name (if exists):
                <input name="cat_name" type="text" ref={nameInputRef} defaultValue={currentCat?.name}
                className="block w-full px-2 py-1.5 border text-sm sm:text-base sm:leading-6 
                text-black rounded-md bg-white border-border" />
              </label>
              <label className="flex items-center cursor-pointer max-w-80 my-2">
                <input type="checkbox" name="is_public" className="sr-only peer" ref={isPublicInputRef} defaultChecked={currentCat?.is_public ?? true}/>
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 
                after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-icon"></div>
                <span className="ms-3 text-sm font-medium">Make it public</span>
              </label>
              {Object.keys(tags).map((item: any, index:number) => tags[item].length === 0 ? (null) : (
                <div key={index} className={style.questionBox}>
                  <label className="cursor-pointer sm:hover:bg-background-hover rounded-lg transition-colors">
                    <input type="checkbox" className={style.invisibleInput} defaultChecked={true}
                    onInput={(event:any) => {
                      const elem = document.getElementById(`ans${index}`)
                      if (elem) {
                        elem.style.gridTemplateRows = event.target.checked ? "1fr" : '0fr'
                        elem.style.padding = event.target.checked ? "8px 0px" : '0px'
                      }
                    }}/>
                    <div className={style.questionTitle}>
                      <div className="w-6"></div>
                      <p className=" first-letter:uppercase">{tags[item][0].tag_category_name}</p>
                      <div className={style.questionIcon}>
                        <svg enableBackground="new 0 0 32 32" height="24" version="1.1" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002 
                          c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" fill="currentColor"/><g/><g/><g/><g/><g/><g/>
                        </svg>
                      </div>
                    </div>
                  </label>
                  <div className={style.answerBox} id={`ans${index}`}
                  style={{
                    padding: "8px 0px",
                    gridTemplateRows: "1fr"
                  }}>
                    <div className={style.answerText}>
                      {tags[item].map((tag: Tag) => tag.tag_name !== null ? (selectedTags.indexOf(tag.tag_id) >= 0 ? (
                        <button key={tag.tag_id} className="rounded-lg py-1 px-2 bg-accent hover:bg-button-hover
                        transition-colors cursor-pointer" onClick={() => {
                          const newArr = [...selectedTags]
                          newArr.splice(newArr.indexOf(tag.tag_id), 1)
                          setSelectedTags(newArr)
                        }}>
                          {tag.tag_name}
                        </button>
                      ) : (
                        <button key={tag.tag_id} className="rounded-lg py-1 px-2 bg-background-hover hover:bg-button
                        transition-colors cursor-pointer" onClick={() => {
                          setSelectedTags([...selectedTags, tag.tag_id])
                        }}>
                          {tag.tag_name}
                        </button>
                      )) : null)}
                      <button className="rounded-lg py-1 px-2 bg-background-hover hover:bg-button
                      transition-colors cursor-pointer" onClick={() => setSelectedCategory(tags[item][0].tag_category_id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-1 px-2 text-lg font-[Verdana] rounded-lg text-center hover:bg-background-hover" 
              onClick={() => setIsAddCategoryModalOpen(true)}>+ Add category</button>
            </div>
          ) : null}
        </div>
      </div>

      <Modal isOpen={!!selectedTagCategory} onClose={() => {setSelectedCategory(undefined)}}>
        <div className='py-3 px-6 rounded-lg bg-background relative flex flex-col items-center w-[300px]'>
          <h1 className=' text-center text-xl font-medium sm:whitespace-nowrap whitespace-normal'>Entry tag name:</h1>
          <input name="tag_name" type="text" ref={addTagRef} autoComplete="off"
          className="block w-full px-1 py-0.5 border text-sm sm:text-base sm:leading-6 
          text-black rounded-md bg-white border-border" />
          <div className="flex flex-col gap-y-2">
            <button onClick={() => AddTag(selectedTagCategory, addTagRef.current?.value)} 
            className="font-semibold text-foreground transition-colors
            border border-border hover:border-lime-500 hover:bg-lime-400 
            rounded-lg text-sm px-4 py-2 mt-4 text-center">Add</button>
            <DefaultButton type="button" isButton={true} click={() => setSelectedCategory(undefined)}>Cancel</DefaultButton>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isAddCategoryModalOpen} onClose={() => {setIsAddCategoryModalOpen(false)}}>
        <div className='py-3 px-6 rounded-lg bg-background relative flex flex-col items-center w-[300px]'>
          <h1 className=' text-center font-medium sm:whitespace-nowrap whitespace-normal'>Entry category name:</h1>
          <input name="tag_category_name" type="text" ref={addCategoryRef} autoComplete="off"
          className="block w-full px-1 py-0.5 border text-sm sm:text-base sm:leading-6 
          text-black rounded-md bg-white border-border mt-1" />
          <div className="flex flex-col gap-y-2">
            <button onClick={() => AddCategory(addCategoryRef.current?.value)} 
            className="font-semibold text-foreground transition-colors
            border border-border hover:border-lime-500 hover:bg-lime-400 
            rounded-lg text-sm px-4 py-2 mt-4 text-center">Add</button>
            <DefaultButton type="button" isButton={true} click={() => setIsAddCategoryModalOpen(false)}>Cancel</DefaultButton>
          </div>
        </div>
      </Modal>

      <ModalError close={() => setErrorText('')} text={errorText}></ModalError>
    </div>
  )
}