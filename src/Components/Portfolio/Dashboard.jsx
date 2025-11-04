import {React, useContext, useState, useEffect} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import CoinDisplayChart from './CoinDisplayChart';
import TopWinners from './TopWinners';
import WatchList from './WatchList';
import WatchListCoinCard from './WatchListCoinCard';
import PerformanceBarChart from './PerformanceBarChart';






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
  const [coin, setCoin] = useState({});
  const [coinClicked, setCoinClicked] = useState(false);


  





  return (
        <div className=' m-3 h-[900px] max-h-[1200px]'>
          {coinClicked ? <WatchListCoinCard coin = {coin} coinClicked = {coinClicked} setCoinClicked = {setCoinClicked}></WatchListCoinCard> : null}
          <div className='flex flex-row h-[700px] justify-between'>
            <div className='flex flex-col'>
              <div className='w-fit h-full flex flex-col justify-between'>
                <div className = 'flex flex-col'>
                  <TopWinners></TopWinners>
                </div>
                <div className='flex flex-row w-full h-fit border-2'>
                  <div className='mt-12 -mb-5 border-2'>
                      <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2'>Assets</h1>
                      <CoinDisplayChart></CoinDisplayChart>
                  </div>
                  <div className='mt-12 h-fit'>
                    <h1></h1>
                    <PerformanceBarChart></PerformanceBarChart>
                  </div>
                </div>
              </div>
             </div>
              <WatchList coinClicked = {coinClicked} setCoinClicked = {setCoinClicked} coin = {coin} setCoin = {setCoin}></WatchList>
          </div>
        </div>
  )
}

export default Dashboard