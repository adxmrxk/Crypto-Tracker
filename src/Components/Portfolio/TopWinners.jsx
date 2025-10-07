import {React, useContext, useState, useEffect} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'



const TopWinners = () => {
  const {user, setUser} = useContext(UserContext);
  const [sortedData, setSortedData] = useState([]);


  const coinNames = user?.watchList.map((element, index) => {
    return element.coin
  })

  const { data, error, isLoading } = useCryptoCurrency(coinNames);

  useEffect(() => {
  if (data && Array.isArray(data)) {
    const sorted = [...data].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setSortedData(sorted);
  }
  }, [data]);


  return (
    <div>
        <div className='flex flex-col justify-center ml-5 w-[475px] mt-3 border border-sky-200'>
                    <h1 className='font-roboto font-semibold text-xl mt-5 mb-3'>Top Coin Winners</h1>
                    <div className = ''>

                      <div className='flex flex-row justify-between mb-3 items-center hover:bg-gray-300 hover:mx-1 hover:rounded-xs transition-all duration-250 ease-in-out'>
                        <h1 className='ml-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 ring ring-yellow-300 w-[35px] h-fit py-1 font-black shadow-2xl'>1</h1>
                        <div className='flex flex-col text-left w-[175px]'>
                          <div className='flex flex-row'>
                            <img src = {sortedData?.[0]?.image} className='w-[24px] h-[24px] mt-1'></img>
                            <div className='flex flex-col'>
                              <div className='flex flex-row items-center'>
                                <h1 className='ml-1 font-semibold'>{sortedData?.[0]?.name}: </h1>
                                <h1 className='ml-1 text-sm font-semibold mt-0.5 text-gray-800'>${sortedData?.[0]?.current_price.toFixed(2)}</h1>
                              </div>
                              <h1 className='text-sm text-gray-700'>${(sortedData?.[0]?.current_price / (1 + sortedData?.[0]?.price_change_percentage_24h / 100)).toFixed(2)}</h1>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex flex-row justify-between mb-3 items-center hover:bg-gray-300 hover:mx-1 hover:rounded-xs transition-all duration-250 ease-in-out'>
                        <h1 className='ml-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 ring ring-yellow-300 w-[35px] h-fit py-1 font-black shadow-2xl'>2</h1>
                        <div className='flex flex-col text-left w-[175px]'>
                          <div className='flex flex-row'>
                            <img src = {sortedData?.[1]?.image} className='w-[24px] h-[24px] mt-1'></img>
                            <div className='flex flex-col'>
                              <div className='flex flex-row items-center'>
                                <h1 className='ml-1 font-semibold'>{sortedData?.[1]?.name}: </h1>
                                <h1 className='ml-1 text-sm font-semibold mt-0.5 text-gray-800'>${sortedData?.[1]?.current_price.toFixed(2)}</h1>
                              </div>
                              <h1 className='text-sm text-gray-700'>${(sortedData?.[1]?.current_price / (1 + sortedData?.[1]?.price_change_percentage_24h / 100)).toFixed(2)}</h1>
                            </div>
                          </div>
                        </div>
                      </div>

                      {sortedData?.[2]?.name ? <div className='flex flex-row justify-between mb-3 items-center hover:bg-gray-300 hover:mx-1 hover:rounded-xs transition-all duration-250 ease-in-out'>
                        <h1 className='ml-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 ring ring-yellow-300 w-[35px] h-fit py-1 font-black shadow-2xl'>3</h1>
                        <div className='flex flex-col text-left w-[175px]'>
                          <div className='flex flex-row'>
                            <img src = {sortedData?.[2]?.image} className='w-[24px] h-[24px] mt-1'></img>
                            <div className='flex flex-col'>
                              <div className='flex flex-row items-center'>
                                <h1 className='ml-1 font-semibold'>{sortedData?.[2]?.name}: </h1>
                                <h1 className='ml-1 text-sm font-semibold mt-0.5 text-gray-800'>${sortedData?.[2]?.current_price.toFixed(2)}</h1>
                              </div>
                              <h1 className='text-sm text-gray-700'>${(sortedData?.[2]?.current_price / (1 + sortedData?.[2]?.price_change_percentage_24h / 100)).toFixed(2)}</h1>
                            </div>
                          </div>
                        </div>
                      </div> : null}

                    </div>
        </div>
    </div>
  )}

export default TopWinners