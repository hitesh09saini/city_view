"use client"

import React from 'react'
import { useStateContext } from './contextapi/stateContext'
import Card from './Card'


const Gallery = () => {
  const { posts, setPage,
    loading,
    hasMore } = useStateContext();

  const handleScroll = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  }






  return (
    <div className=" p-3 py-5 ">

      <div className="gallery " >
        <div className="gallery-item hover:scale-none hover:shadow-none">
          <img loading='lazy' src={'/ads.gif'} alt={'upload your mahwa image'} />
        </div>

        {posts.length > 0 && posts.map((item, i) => (
          <Card item={item} key={item?._id + i} />
        ))}
      </div>



      {
        hasMore && (
          <div onClick={handleScroll} className='fixed right-[20px] text-2xl font-extrabold bottom-[20px] z-50 bg-gray-400 shadow p-4 '>
            &#8595;
          </div>
        )
      }

      {!hasMore ? <p className='text-center font-bold text-2xl text-gray-400'>No more posts available.</p> : loading && <p className='text-center font-bold text-2xl text-gray-400'>Loading...</p>}
    </div>
  )
}

export default Gallery