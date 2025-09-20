import React from 'react'
import { UserContext } from '../../Pages/Skeleton'
import { useContext } from 'react'
import { useState } from 'react'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import axios from 'axios'
import { COIN_DESC } from '../../utils/coinCatagories'
import Layer1 from './Layer1'
import { IoFilter } from "react-icons/io5";
import Layer2 from './Layer2'
import DeFiTokens from './DeFiTokens'
import WatchList from './WatchList'




const ExploreServersSection = () => {




  return (
    <div className="-mt-8 -mb-8 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 z-0">
        <div className='w-3/5 mx-auto py-10'>
            <h1 className='font-roboto text-3xl font-bold text-left text-gray-300'>Explore Servers</h1>
            <hr className='border-gray-200 mt-3 mb-10'></hr>
            <WatchList></WatchList>
            {/*<h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Recomended</h1>
            <div className='mb-10'></div>*/}
            <Layer1></Layer1>
            <Layer2></Layer2>
            <DeFiTokens></DeFiTokens>
            {/*<h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Stablecoins</h1>
            <div className='mb-10'></div>
            <h1 className='font-roboto text-2xl font-semibold text-left text-gray-300'>Meme Coins</h1>
            <div className='mb-10'></div>*/}
            
        </div>
    </div>
  )
}

export default ExploreServersSection