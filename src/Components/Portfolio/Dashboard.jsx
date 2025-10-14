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






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
  const [coin, setCoin] = useState({});
  const [coinClicked, setCoinClicked] = useState(false);


  





  return (
        <div className=' m-3 h-[800px]'>
          {coinClicked ? <WatchListCoinCard coin = {coin} coinClicked = {coinClicked} setCoinClicked = {setCoinClicked}></WatchListCoinCard> : null}
          <div className='flex flex-row h-[700px] justify-between'>
            <div className='flex flex-col'>
              <div className='w-fit h-full flex flex-col justify-between'>
                <div className = 'flex flex-col'>
                  <TopWinners></TopWinners>
                </div>
                <div className='ml-5 mt-12 -mb-3'>
                    <h1 className = '-translate-y-10 mr-28 mb-4 font-roboto'>Asset Allocation</h1>
                    <CoinDisplayChart></CoinDisplayChart>
                </div>
              </div>
             </div>
              <WatchList coinClicked = {coinClicked} setCoinClicked = {setCoinClicked} coin = {coin} setCoin = {setCoin}></WatchList>
          </div>
        </div>
  )
}

export default Dashboard