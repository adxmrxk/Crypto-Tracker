import {React, useContext, useState} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import CoinDisplayChart from './CoinDisplayChart';






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
  const { data, error, isLoading } = useCryptoCurrency(dumbyWatchList);
  
  


  return (
        <div className='border-2 m-3 h-[700px]'>
          <div className='flex flex-row h-[700px] justify-between'>
            <div className='flex flex-col'>
              <div className='w-fit h-full flex flex-col justify-between'>
                <div className = 'flex flex-col'>
                  <div className='border-2 flex flex-col justify-center ml-5 w-[350px]'>
                    <h1 className='font-roboto font-semibold text-xl mt-5 mb-3'>Top Five Winners</h1>
                    <div className = ''>

                      <div className='flex flex-row justify-between mb-3'>
                        <h1 className='ml-3'>1</h1>
                        <div className='flex flex-col text-left'>
                          <h1 className=''>Coin 1: New Price (+8%)</h1>
                          <h1 className='text-sm'>Old Price</h1>
                        </div>
                      </div>

                      <div className='flex flex-row justify-between mb-3'>
                        <h1 className='ml-3'>2</h1>
                        <div className='flex flex-col text-left'>
                          <h1 className=''>Coin 2: New Price (+6%)</h1>
                          <h1 className='text-sm'>Old Price</h1>
                        </div>
                      </div>

                      <div className='flex flex-row justify-between mb-3'>
                        <h1 className='ml-3'>3</h1>
                        <div className='flex flex-col text-left'>
                          <h1 className=''>Coin 3: New Price (+5%)</h1>
                          <h1 className='text-sm'>Old Price</h1>
                        </div>
                      </div>

                      <div className='flex flex-row justify-between mb-3'>
                        <h1 className='ml-3'>4</h1>
                        <div className='flex flex-col text-left'>
                          <h1 className=''>Coin 4: New Price (+3%)</h1>
                          <h1 className='text-sm'>Old Price</h1>
                        </div>
                      </div>

                      <div className='flex flex-row justify-between mb-3'>
                        <h1 className='ml-3'>5</h1>
                        <div className='flex flex-col text-left'>
                          <h1 className=''>Coin 5: New Price (+1%)</h1>
                          <h1 className='text-sm'>Old Price</h1>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className='ml-5 mt-5 -mb-3'>
                    <h1 className = '-translate-y-10 mr-28 mb-4 font-roboto'>Asset Allocation</h1>
                    <CoinDisplayChart></CoinDisplayChart>
                </div>
              </div>
             </div>
             <div className='flex flex-row'>
                {user?.watchList.map((element, index) => {
                  return (
                    <div key = {index} className='flex flex-col border-2 h-fit mt-5 mr-5'>
                      <h1 className='font-roboto text-lg'>{element.ticker.toUpperCase()}</h1>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
  )
}

export default Dashboard