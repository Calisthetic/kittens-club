"use client"

import React, { useState, useEffect, useCallback } from "react";
import Loading from "@/components/loading";
import CatCard from "@/components/cat-card";

export default function LikedPage ({userName}:{userName:string|null|undefined}) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [index, setIndex] = useState(1);

  const itemsPerRequest = 12

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    await fetch(`/api/cats/liked`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        limit: itemsPerRequest,
        offset: index * itemsPerRequest,
        username: userName
      })
    })
    .then(res => res.json())
    .then((data) => {
      if (data.length > 0) {
        setItems((prevItems) => [...prevItems, ...data]);
      } else if (data.length < itemsPerRequest) {
        setIsFinal(true);
      }
    })
    .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await fetch(`/api/cats/liked`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          limit: itemsPerRequest,
          offset: 0,
          username: userName
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Sad...")
        }
      })
      .then(data => setItems(data))
      .catch(error => console.log(error))
      setIsLoading(false);
    };

    getData();
    handleScroll()
    handleScroll()
  }, []);

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



  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 p-1 mt-2 lg:grid-cols-4 xl:grid-cols-6">
          {items ? items.map((item, index) => (
            <CatCard key={index} catId={item.id} catName={item.name} userName={userName} 
            liked={item.liked_by_user_id !== null} favorite={item.favorite_by_user_id !== null}></CatCard>
          )) : null}
        </div>
      </div>
      {(isLoading && !isFinal) && <Loading></Loading>}
    </div>
  );
};