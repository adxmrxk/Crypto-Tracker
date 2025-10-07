import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from '../../Pages/SkeletonPage'

const WatchList = () => {

  const {user, setUser} = useContext(UserContext)
  return (
    <div className='flex flex-row max-w-[350px] h-fit border-2 border-black overflow-hidden'>
        {user?.watchList.map((element, index) => {
            return (
                <div key = {index} className='flex flex-col border-2 h-fit mt-5 mr-5'>
                    <h1 className='font-roboto text-lg'>{element.ticker.toUpperCase()}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default WatchList