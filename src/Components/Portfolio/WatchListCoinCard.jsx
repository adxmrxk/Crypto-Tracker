import React, { useEffect, useState } from 'react'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'

const WatchListCoinCard = ({coin, coinClicked, setCoinClicked}) => {
  const { data } = useCryptoCurrency([coin.coin])
  
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='w-[300px] h-[300px] bg-white rounded-lg'>
          <h1 className='text-black'>{data?.[0]?.name}</h1>
      </div>
    </div>
  )
}

export default WatchListCoinCard