import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from '../../Pages/SkeletonPage'

const WatchList = ( {coin, setCoin, coinclicked, setCoinClicked} ) => {

  const handleClick = (element) => {

    console.log('Watch List Handle Click')
    setCoin(element);
    setCoinClicked(true);

  }
  const {user, setUser} = useContext(UserContext)
  return (
    <div className='flex flex-row max-w-[600px] h-fit py-3 pl-2 -mt-5 overflow-hidden mr-3 '>
        {user?.watchList.map((element, index) => {
            return (
                <div key = {index} className='flex flex-col h-fit mt-5 mr-5 text-md bg-gradient-to-br from-indigo-100  to-indigo-200 px-5 py-2 rounded-xs hover:bg-gray-300 hover:scale-105 transition-all duration-250 cursor-pointer' onClick={() => handleClick(element)}>
                    <h1 className='font-roboto text-lg'>{element.ticker.toUpperCase()}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default WatchList