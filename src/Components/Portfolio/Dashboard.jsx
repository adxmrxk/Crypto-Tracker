import {React, useContext, useState, useEffect} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
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
        <div className=''>

          <h1 className='text-3xl font-semibold pt-5 bg-gradient-to-br from-orange-400 via-rose-500 to-purple-700 bg-clip-text text-transparent'>Investment Overview</h1>
          <p1 className = 'text-lg mb-15 bg-gradient-to-br from-purple-500 to-purple-700 bg-clip-text text-transparent'>Your portfolio at a glance — track, analyze, and optimize your investments.</p1>
          <hr className='border-gray-500 my-1 w-[45%] mx-auto mt-5'></hr>


          <div className=' p-3 h-[900px] max-h-[1200px] mt-12 w-[1700px] mx-auto'>
            {coinClicked ? <WatchListCoinCard coin = {coin} coinClicked = {coinClicked} setCoinClicked = {setCoinClicked}></WatchListCoinCard> : null}
            <div className='flex flex-row h-[700px] justify-between'>
              <div className='flex flex-col'>
                <div className='w-fit h-full flex flex-col justify-between'>
                  <div className = 'flex flex-col'>
                    <TopWinners></TopWinners>
                  </div>
                  <div className='flex flex-row w-full h-fit ml-55'>
                    <div className='mt-15 -mb-5'>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2'>Assets</h1>
                    </div>
                    <div className='mt-12 h-fit'>
                      <h1></h1>
                    </div>
                  </div>
                </div>
               </div>
                <WatchList coinClicked = {coinClicked} setCoinClicked = {setCoinClicked} coin = {coin} setCoin = {setCoin}></WatchList>
            </div>
          </div>
        </div>
  )
}

export default Dashboard