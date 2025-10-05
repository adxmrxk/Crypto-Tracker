import {React, useContext, useState, useEffect} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import CoinDisplayChart from './CoinDisplayChart';
import TopWinners from './TopWinners';






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
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
        <div className='border-2 m-3 h-[700px]'>
          <div className='flex flex-row h-[700px] justify-between'>
            <div className='flex flex-col'>
              <div className='w-fit h-full flex flex-col justify-between'>
                <div className = 'flex flex-col'>
                  <TopWinners></TopWinners>


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