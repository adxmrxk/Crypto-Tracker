import React from 'react'
import { UserContext } from '../../Pages/Skeleton'
import { useContext } from 'react'
import { useState } from 'react'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import axios from 'axios'

const ExploreServersSection = () => {

  const {user, setUser} = useContext(UserContext);
  let userCoins = [];
  
  if (user?.watchList) {
        userCoins = user.watchList.map((coin, index) => {
            return user.watchList[index].coin;
        })  
  }

  const {data, loading, error } = useCryptoCurrency(userCoins);
  console.log(data);

  const fakeWatchList = ['Bitcoin', 'Ethereum', 'DogeCoin', 'Solana', 'Cardano', 'Polygon', 'Ripple', 'Shiba Inu']
  
  const handleClick = async (coin) => {
    console.log('Inside of handleClick on Explore Server Section');
    const coinId = coin.id;
    const response = await axios.patch(`http://localhost:5000/api/addServer/${user._id}`, { $addToSet: { serverList: coinId } } );
    const newUser = response.data;
    setUser(newUser);
    console.log('Server added to server list')


  }

  return (
    <div className="-mt-8 -mb-8 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 z-0">
        <div className='w-3/5 mx-auto py-5'>
            <h1 className='font-roboto text-3xl font-bold text-left text-gray-300 '>Explore Servers</h1>
            <hr className='border-gray-200 mt-3 mb-10'></hr>
            <h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Watch List</h1>
            <div className='grid grid-cols-4 flex-col gap-3 mb-10'>
                {data?.map((coin, index) => {
                    return <div className='bg-gradient-to-r from-black/30 via-black/40 to-black/50 rounded-xs ring ring-gray-100/30 cursor-pointer hover:scale-104 transition-all duration-250 ease-in-out'>
                        <div className='flex flex-row items-center justify-between'>
                            <h1 className='text-left p-3 text-sky-100/60 font-semibold text-xl '>{coin.name}</h1>
                            <img src = {coin.image} className='w-[50px] h-min rounded-full mr-5 pt-2'/>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-left px-3 text-sky-100/60 p-3'>x Members</h1>
                            <h1 className='bg-blue-200/50 h-fit font-roboto mr-5 text-sm px-3 rounded-xs text-gray-900' onClick={() => handleClick(coin)}>Join</h1>
                        </div>
                    </div>
                })}
            </div>
            <button className='text-black bg-gradient-to-b from-amber-400/70 via-amber-500/80 to-amber-600/90 rounded-full px-4 py-1 cursor-pointer '>View More</button>
            <h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Recomended</h1>
            <div className='mb-10'></div>
            <h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Layer 1</h1>
            <div className='mb-10'></div>
            <h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Layer 2</h1>
            <div className='mb-10'></div>
            <h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>DeFi Tokens</h1>
            <div className='mb-10'></div>
            <h1 className='font-roboto text-2xl font-semibold text-left mb-2 text-gray-300'>Stablecoins</h1>
            <div className='mb-10'></div>
            <h1 className='font-roboto text-2xl font-semibold text-left text-gray-300'>Meme Coins</h1>
            <div className='mb-10'></div>
            
        </div>
    </div>
  )
}

export default ExploreServersSection