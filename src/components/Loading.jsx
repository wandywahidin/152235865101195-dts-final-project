import React from 'react'
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className='w-full h-full container'>
        <img className=' mt-16 mx-auto' src={loading} alt="laoding" />
        <h1 className='text-center text-2xl font-bold'>Loading...</h1>
    </div>
  )
}

export default Loading