import React, { useState } from 'react'
import useCryptoCurrency from '../hooks/useCryptoCurrency';

const RecommendedCoins = () => {
  const { data } = useCryptoCurrency()

  return (
    <div className=''>
        <div className='w-[75%] h-[455px] mx-auto flex justify-center flex-col mt-3 mb-3 bg-white/20 shadow-2xl p-3 rounded-2xl overflow-y-scroll scrollbar-hide'>
        <div className='w-4/5 h-auto max-h-[450px] mx-auto flex flex-col gap-3'>
          {data?.map((element, index) => 
            <div key={index} className='ring-1 ring-blue-400 flex flex-col gap-2 bg-white/10 p-3 rounded-xl shadow hover:bg-white/20 transition mt-1'>
              <div className='flex flex-row gap-2 items-center'>
                <img src={element.image} alt={element.name} className='w-6 h-6 rounded-full object-contain mb-7.5 ml-5'></img>
                <div className='mb-3'>
                    <h1 className='text-left text-sm font-bold truncate'>{element.name}</h1>
                    <p className='text-sm text-left'>Description Of Bitcoin</p>
                </div>
              </div>
              <div className='flex flex-row justify-between items-center mt-5'>
                <div className='flex -flex-row items-center'>
                    <h1 className='text-sm font-semibold'>Price: </h1>
                    <h1 className='text-left text-sm ml-2 mt-0.5 text-yellow-700 font-normal bg-yellow-800/30 px-2 rounded-sm'>${Number(element.current_price.toFixed(2)).toLocaleString()}</h1>
                    <h1 className='text-sm font-semibold ml-5'>Fluctuation: </h1>
                    <h1 className={`text-left text-sm ml-2 mt-0.5 font- px-2 rounded-sm ${element.price_change_percentage_24h > 0 ? 'text-green-700 bg-green-800/30' : 'text-red-700 bg-red-800/30'}`}>{element.price_change_percentage_24h.toFixed(2)}%</h1>
                </div>
                <button onClick={() => addToWatchList(element.name)} className='text-xs bg-slate-300 px-3 py-1 rounded-lg font-medium hover:bg-slate-400 transition cursor-pointer'>Add</button>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default RecommendedCoins