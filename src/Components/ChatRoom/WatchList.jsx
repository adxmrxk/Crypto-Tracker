import React from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { useContext } from 'react'
import { useState } from 'react'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import axios from 'axios'
import { COIN_DESC_SHORT } from '../../utils/coinCatagories'
import Layer1 from './Layer1'
import { IoFilter } from "react-icons/io5";
import Layer2 from './Layer2'
import DeFiTokens from './DeFiTokens'
import { Scrollbar } from 'react-scrollbars-custom';



const WatchList = () => {
    const {user, setUser} = useContext(UserContext);
    let userCoins = [];
  
    if (user?.watchList) {
        userCoins = user.watchList.map((coin, index) => {
            return user.watchList[index].coin;
        })  
    }

    

    const {data, loading, error } = useCryptoCurrency(userCoins);
    console.log('Watch List: ', data);
    
    
  return (
    <div className='w-[92%] mx-auto'>
        <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center'>
                    <h1 className='font-roboto text-2xl font-semibold text-left mb-5 text-gray-300'>Watch List</h1>
                </div>
            </div>
                <div className='mb-12'>
                    <Scrollbar style = {{ width: '100%', height: 170}} noScrollY>
                        <div className='flex flex-row gap-3 mb-10 white py-2 px-2'>
                            {data?.map((coin, index) => {
                                return <div className='flex flex-row justify-between w-[275px] shrink-0 bg-gradient-to-r from-gray-200/30 via-gray-300/40 to-gray-400/50 rounded-xs  cursor-pointer hover:scale-104 transition-all duration-250 ease-in-out'>
                                    <div className='flex flex-col ml-4 p-2 w-[175px]'>
                                        <h1 className='text-left text-sky-100/60 font-semibold text-xl '>{coin.name}</h1>
                                        <h1 className='text-left text-sky-100/60'>x Members</h1>
                                        <p className='text-left text-sm mt-2 mb-3 leading-tight text-gray-300'>{COIN_DESC_SHORT[coin.id.toLowerCase().split('-').join('')]}</p>
                                    </div>
                                    <div className='flex flex-col w-fit items-center justify-end gap-5 mb-1'>
                                        <img src = {coin.image} className='w-[50px] h-min rounded-full mr-5 mt-3'/>
                                        <h1 className='bg-blue-200/50 h-fit font-roboto mr-5 text-sm px-3 rounded-xs text-gray-900 mb-5' onClick={() => handleClick(coin)}>Join</h1>
                                    </div>
                                </div>
                            })}
                        </div>
                    </Scrollbar>
                </div>
    </div>
  )
}

export default WatchList