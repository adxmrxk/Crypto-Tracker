import React, { useEffect, useState, useContext } from 'react'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import { UserContext } from '../../Pages/SkeletonPage'
import ButtonComponent from '../ButtonComponent'
import ControlledSwitches from '../ControlledSwitches'


const WatchListCoinCard = ({coin, coinClicked, setCoinClicked}) => {
  const { data } = useCryptoCurrency([coin.coin])
  const {user, setUser} = useContext(UserContext);

  


  
  return (
    <div className='fixed inset-0 flex justify-center z-50 mt-12'>
      <div className='w-[350px] h-fit bg-gradient-to-br from-black/60 via-black/70 to-black/80 ring ring-gray-100 rounded-sm'>
          <div className='flex flex-col ml-5 mt-3'>
            <div className='flex flex-row justify-between'>
              <h1 className='text-white text-2xl text-left'>{data?.[0]?.name}</h1>
              <img src = {data?.[0]?.image} className='w-[42px] h-[42px] mr-3 '></img>
            </div>
            <form className='flex flex-row gap-2 -mt-1'>
              <h1 className='text-sm text-white'>Amount: {user?.watchList?.find( (item) => item.coin.toLowerCase() === data?.[0]?.id?.toLowerCase())?.amount || ''}</h1>
              <input type='number' placeholder='Update' className='text-xs text-white border-b-1 border-white w-[40px] outline-0'></input>
            </form>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row mt-5'>
              <h1 className='text-sm text-white'>Notifications</h1>
              <ControlledSwitches marginLeft = {-11.5} marginTop = {3}></ControlledSwitches>
            </div>
                <form className='flex items-center border-2'>
                  <input></input>
                </form>
            </div>
          </div>


      </div>
    </div>
  )
}

export default WatchListCoinCard