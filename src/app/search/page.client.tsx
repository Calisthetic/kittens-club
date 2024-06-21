"use client"

import React, { useState, useEffect, useCallback } from "react";
import style from "./search.module.css"
import Loading from "@/components/loading";
import CatCard from "@/components/cat-card";
import ModalError from "@/components/modal-error";

type Tag = {
  tag_id: number
  tag_name: number
}

export default function SearchPage ({userName}:{userName:string|null|undefined}) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [index, setIndex] = useState(1);
  const [errorText, setErrorText] = useState('')

  const [searchText, setSearchText] = useState('')
  const [isMine, setIsMine] = useState(false)
  const [selectedTags, setSelectedTags] = useState<number[]>([])

  const itemsPerRequest = 12

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    await fetch(`/api/cats/search`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        limit: itemsPerRequest,
        offset: index * itemsPerRequest,
        search: searchText,
        tags: selectedTags,
        username: userName,
        is_mine: isMine
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error()
      }
    })
    .then((data) => {
      if (data.length > 0) {
        setItems((prevItems) => [...prevItems, ...data]);
      } else if (data.length < itemsPerRequest) {
        setIsFinal(true);
      }
    })
    .catch(() => setErrorText('Cats not found...'));
    setIndex((prevIndex) => prevIndex + 1);

    setIsLoading(false);
  }, [index, isLoading, searchText, selectedTags, isMine]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await fetch(`/api/cats/search`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          limit: itemsPerRequest,
          offset: 0,
          search: searchText,
          tags: selectedTags,
          username: userName,
          is_mine: isMine
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Sad...")
        }
      })
      .then(data => {
        if (data.length === 0) {
          setItems([])
          setErrorText("The response was recieved, but there's no data on server")
        } else {
          setItems(data)
        }
      })
      .catch(() => setErrorText('Cats not found...'))
      setIsLoading(false);
      handleScroll()
    };

    getData();
    setIndex(1)
  }, [searchText, selectedTags, isMine]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;
    if ((scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && !isFinal) || scrollHeight === clientHeight) {
      fetchData();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData, isLoading, isFinal]);



  const [tags, setTags] = useState<any[]|null>()
  useEffect(()=>{
    const getTags = async () => {
      await fetch("/api/tags")
      .then(res=>res.json())
      .then(data => setTags(data))
      .catch(error => alert(error))
    }
    getTags()
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center">
      <div className="max-w-7xl w-full">
        <label className="block text-base px-2 font-medium leading-6 my-2">
          Start typing or select tags below:
          <input name="search" type="search" onInput={(e:any) => setSearchText(e.target.value)}
          className="block w-full px-2 py-1.5 border text-sm sm:text-base sm:leading-6 
          text-black rounded-md bg-white border-border" />
        </label>
        <label className="flex items-center cursor-pointer max-w-80 ml-2">
          <input type="checkbox" name="is_mine" className="sr-only peer" 
          defaultChecked={isMine} onInput={(e:any) => setIsMine(e.target.checked)}/>
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 
          after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-icon"></div>
          <span className="ms-3 text-sm font-medium">My cats only</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 p-1 md:p-2">
          {tags ? Object.keys(tags).map((item: any, index:number) => tags[item].length === 0 ? (null) : (
            <div key={index} className={style.questionBox}>
              <label className="cursor-pointer sm:hover:bg-background-hover rounded-lg transition-colors">
                <input type="checkbox" className={style.invisibleInput} defaultChecked={false}
                onInput={(event:any) => {
                  const elem = document.getElementById(`ans${index}`)
                  if (elem) {
                    elem.style.gridTemplateRows = event.target.checked ? "1fr" : '0fr'
                    elem.style.padding = event.target.checked ? "8px 0px" : '0px'
                  }
                }}/>
                <div className={style.questionTitle}>
                  <div></div>
                  <p className=" first-letter:uppercase">{tags[item][0].tag_category_name}</p>
                  <div className={style.questionIcon}>
                    <svg enableBackground="new 0 0 32 32" height="24" version="1.1" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002 
                      c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" fill="currentColor"/><g/><g/><g/><g/><g/><g/>
                    </svg>
                  </div>
                </div>
              </label>
              <div className={style.answerBox} id={`ans${index}`}>
                <div className={style.answerText}>
                  {tags[item].map((tag: Tag) => selectedTags.indexOf(tag.tag_id) >= 0 ? (
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
                  ))}  
                </div>
              </div>
            </div>
          )) : null}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 p-1 lg:grid-cols-4 xl:grid-cols-6">
          {items ? items.map((item, index) => (
            <CatCard key={index} catId={item.id} catName={item.name} userName={userName} allowEdit={false}
            liked={item.liked_by_user_id !== null} favorite={item.favorite_by_user_id !== null} modal></CatCard>
          )) : null}
        </div>
      </div>
      {(isLoading && !isFinal) && <Loading></Loading>}

      <ModalError close={() => setErrorText('')} text={errorText}></ModalError>
    </div>
  );
};