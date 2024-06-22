"use client"

import Image from 'next/image'
import Link from 'next/link';
import { useRef, useState } from 'react';
import Modal from './modal';

export default function CatCard({catId, catName, userName, liked, favorite, allowEdit, modal}
:{catId:number, catName:string, userName:string|null|undefined, liked: boolean, favorite:boolean, allowEdit:boolean|undefined, modal?:boolean}) {
  const [isUpdate, setIsUpdate] = useState<boolean>(true)
  const likedRef = useRef(liked)
  const favoriteRef = useRef(favorite)

  const Download = async (id:number) => {
    await fetch(`/api/cats/${id}/image`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(resp => {
      if (resp.status === 200) {
        resp.headers.get('Content-Disposition');
        return resp.blob()
      } else {
        throw new Error('something went wrong')
      }
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `cat${id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url); 
    })
    .catch(error => {
      console.log("Failed to download file", error.message)
    });
  }

  const Favorite = async (id:number) => {
    favoriteRef.current = !favoriteRef.current
    setIsUpdate(x => !x)
    await fetch(`/api/cats/${id}/favorite`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName
      })
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        favoriteRef.current = !favoriteRef.current
        setIsUpdate(x => !x)
        throw new Error('something went wrong')
      }
    })
    .catch(error => {
      console.log("Failed to download file", error.message)
    });
  }

  const Like = async (id:number) => {
    likedRef.current = !likedRef.current
    setIsUpdate(x => !x)
    await fetch(`/api/cats/${id}/like`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName
      })
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        likedRef.current = !likedRef.current
        setIsUpdate(x => !x)
        throw new Error('something went wrong')
      }
    })
    .catch(error => {
      console.log("Failed to download file", error.message)
    });
  }

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='p-1'>
      <div className='relative max-h-min aspect-square'>
        <Image src={process.env.NEXT_PUBLIC_API_URL + '/api/cats/' + catId + '/image'} alt={'cat ' + catId} 
        height={1600}
        width={1600}
        priority={false}
        className='object-cover !w-full aspect-square rounded'></Image>
        {modal ? (
          <button onClick={() => setShowModal(true)} className='!h-full !w-full top-0 aspect-square absolute'></button>
        ) : null}
        {userName ? (
          <>
          {likedRef.current ? (
            <button className='absolute top-[calc(100%-26px)] left-0.5 stroke-white fill-white' onClick={() => Like(catId)}>
              <svg enableBackground="new 0 0 24 24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              className='h-6 w-6 stroke-white stroke-2'><g>
                <path d="M23.3,8.6c0,5.2-7.7,10.6-10.3,12.4c-0.6,0.4-1.3,0.4-1.8,0C8.4,19.3,0.8,13.8,0.8,8.6c0-3.3,2.6-5.9,5.9-5.9 
                c2.4,0,4.4,1.4,5.4,3.4c0.9-2,3-3.4,5.4-3.4C20.6,2.7,23.3,5.4,23.3,8.6z"/></g>
              </svg>
            </button>
          ) : (
            <button className='absolute top-[calc(100%-26px)] left-0.5 stroke-white fill-white' onClick={() => Like(catId)}>
              <svg enableBackground="new 0 0 24 24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              className='h-6 w-6 stroke-white fill-none stroke-2'><g>
                <path d="M23.3,8.6c0,5.2-7.7,10.6-10.3,12.4c-0.6,0.4-1.3,0.4-1.8,0C8.4,19.3,0.8,13.8,0.8,8.6c0-3.3,2.6-5.9,5.9-5.9 
                c2.4,0,4.4,1.4,5.4,3.4c0.9-2,3-3.4,5.4-3.4C20.6,2.7,23.3,5.4,23.3,8.6z"/></g>
              </svg>
            </button>
          )}
          {favoriteRef.current ? (
            <button className='absolute top-[calc(100%-26px)] left-[calc(100%-26px)]' onClick={() => Favorite(catId)}>
              <svg enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
              className='stroke-2 fill-while h-6 w-6 stroke-white'>
                <path d="M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0 
                L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z"/>
              </svg>
            </button>
          ) : (
            <button className='absolute top-[calc(100%-26px)] left-[calc(100%-26px)]' onClick={() => Favorite(catId)}>
              <svg enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
              className='stroke-2 fill-none h-6 w-6 stroke-white'>
                <path d="M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0 
                L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z"/>
              </svg>
            </button>
          )}
          </>
        ) : null}
        {allowEdit ? (
          <Link href={'/tags/' + catId} className='absolute top-0 left-0'>
            <svg strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 stroke-white fill-none'>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </Link>
        ) : null}
        <button className='absolute top-0.5 left-[calc(100%-26px)]' onClick={() => Download(catId)}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          className='h-6 w-6 stroke-white fill-white'>
            <path d="M18,20H6a1,1,0,0,1,0-2H18a1,1,0,0,1,0,2Z"/>
            <path d="M15.92,11.62A1,1,0,0,0,15,11H13V5a1,1,0,0,0-2,0v6H9a1,1,0,0,0-.92.62,1,1,0,0,0,.21,1.09l3,3a1,
            1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3A1,1,0,0,0,15.92,11.62Z" strokeWidth={2} fill='transparent'/>
          </svg>
        </button>
      </div>
      <p className='text-sm text-wrap text-center'>{catName}</p>
      {modal ? (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Image src={process.env.NEXT_PUBLIC_API_URL + '/api/cats/' + catId + '/image'} alt={'cat ' + catId} 
          height={1600}
          width={1600}
          priority={false}
          className='object-cover !w-full max-h-[94vh] max-w-[94vw] rounded'></Image>
        </Modal>
      ) : null}
    </div>
  )
}