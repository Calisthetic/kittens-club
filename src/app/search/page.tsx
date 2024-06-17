"use client"

import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image'

const InfiniteScrollExample2 = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [index, setIndex] = useState(1);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    await fetch(`/api/cats?offset=${index}0&limit=10`)
      .then(res => res.json())
      .then((data) => {
        if (data.length > 0) {
          setItems((prevItems) => [...prevItems, ...data]);
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
      try {
        await fetch("/api/cats?offset=0&limit=10")
        .then(res => res.json())
        .then(data => setItems(data))
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading && !isFinal) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData, isLoading, isFinal]);

  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 p-1 lg:grid-cols-4 xl:grid-cols-6 max-w-7xl">
        {items.map((item) => (
          <div key={item.id} className='w-fill relative p-1 min-h-max'>
            <Image src={'/api/cats/' + item.id + '/image'} alt={'cat ' + item.id} 
            height={1000}
            width={1000}
            priority={false}
            className='object-cover !w-full aspect-square rounded'></Image>
          </div>
        ))}
      </div>
      {(isLoading && !isFinal) && <div>Loading</div>}
    </div>
  );
};

export default InfiniteScrollExample2;

export async function Page() {
  return (
    <div className="min-h-[calc(100vh-48px)] w-full flex justify-center items-center">

    </div>
  )
}