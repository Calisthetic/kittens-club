"use client"

import Image from 'next/image'
import { useEffect, useState } from "react";

type Cat = {
  id:number
}

export default function Home() {
  // const auth1 = await auth()
  // console.log(auth1)
  const [cats, setCats] = useState<Cat[]>()

  useEffect(() => {
    fetch('api/cats', {
      method: 'GET'
    }).then(res => {
      if (res.ok)
        return res.json()
      else
        throw new Error()
    }).then(data => setCats(data))
  }, [])
  
  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 p-1 lg:grid-cols-4 xl:grid-cols-6 max-w-7xl">
        {
          cats ? cats.map((item, index) => (
            <div key={item.id} className='w-fill relative p-1 min-h-max'>
              <Image src={process.env.NEXT_PUBLIC_API_URL + '/api/cats/' + item.id + '/image'} alt={'cat ' + item.id} 
              height={1000}
              width={1000}
              priority={false}
              className='object-cover !w-full aspect-square rounded'></Image>
            </div>
          )) : null
        }
      </div>
    </div>
  );
}
