import React from 'react'
import { useContext, createContext, useState, useEffect, useRef } from 'react'
import { UserContext } from '../Pages/SkeletonPage'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartSchema from '../utils/chartSchema';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';




ChartJS.register(ArcElement, Tooltip, Legend);



const CryptoChartSection = () => {

  const {user, setUser} = useContext(UserContext);

  const [scrollPosition, setScrollPosition] = useState(0);
  const ITEM_WIDTH = 200;
  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };
  
  const [coin, setCoin] = useState( '' );
  const [amount, setAmount] = useState(0);

  useEffect(() => {
  if (user.watchList && user.watchList.length > 0) {
    setCoin(prev => prev || user.watchList[user.watchList.length - 1].coin); 
  }
}, [user.watchList]);

useEffect(() => {
  if (user.watchList && user.watchList.length > 0) {
    setAmount(prev => prev || user.watchList[0].amount); 
  }
}, [user.watchList]);


  
    


  return (
    <div>
      {user.watchList.length > 1 ? <div className='flex gap-10 flex-col items-center'>
          <div className='flex flex-row items-end mx-auto'>
            { user.watchList && user.watchList.length > 3 ? <ChevronLeftIcon onClick = {() => {handleScroll(-ITEM_WIDTH)}}className='mb-2 cursor-pointer'/> : null}
              <div className='w-[450px] flex justify-center'>
                <div ref = {containerRef} className={`flex gap-3 mt-10 items-center mx-auto overflow-hidden w-fit p-2`}>
                  {user.watchList.map((element, index) => {
                    return ( <button className='text-lg font-semibold bg-gray-100 px-10 py-2 rounded-xs hover:bg-gray-300 hover:scale-105 transition-all duration-250 cursor-pointer' onClick={() => {
                      setCoin(element.coin);
                      setAmount(element.amount);
                    }} key = {index}>{element.ticker.toUpperCase()}</button> )
                  })}
                </div>
              </div>
            { user.watchList && user.watchList.length > 3 ? <ChevronRightIcon onClick = {() => {handleScroll(ITEM_WIDTH)}}className='mb-2 cursor-pointer'/> : null}        </div>
          <div className='w-[700px] h-[500px] mb-30'>
              <div className='flex items-center justify-center w-[700px] h-[500px]'>
                <div className = 'ring-1 ring-blue-200  w-[700px] h-[500px] shadow-xl bg-gradient-to-br from-gray-400 to-gray-500 mb-10 rounded-xs'>
      
                        <ChartSchema coin = {coin} amount = {amount}></ChartSchema>
      
                  </div>
              </div>
          </div>
      </div> : null}
    </div>
    
  )
}

export default CryptoChartSection