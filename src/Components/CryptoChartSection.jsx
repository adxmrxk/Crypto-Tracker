import React from 'react'
import { useContext, createContext, useState } from 'react'
import { UserContext } from '../Pages/Skeleton'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartSchema from '../utils/chartSchema';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ChartJS.register(ArcElement, Tooltip, Legend);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

const CryptoChartSection = () => {

  const {user, setUser} = useContext(UserContext);
  const [coin, setCoin] = useState('bitcoin');
  const [amount, setAmount] = useState(0.25);
  
    


  return (
    <div className='flex gap-10 flex-col items-center'>
        <div className={`flex gap-3 mt-10 w-[450px] items-center mx-auto overflow-hidden ${user.watchList.length <= 3 ? 'justify-center' : 'justify-start'}`}>
          {user.watchList.map((element, index) => {
            return ( <button className='text-lg font-semibold bg-gray-100 px-10 py-2 rounded-xs hover:bg-gray-300 hover:scale-105 transition-all duration-250 cursor-pointer' onClick={() => setCoin(element.coin)} key = {index}>{element.ticker.toUpperCase()}</button> )
          })}
          
        </div>
        <div className='w-[700px] h-[500px] mb-30'>
            { user.watchList.length > 0 ?  <div className = 'ring-1 ring-blue-200  w-[700px] h-[500px] shadow-xl bg-gradient-to-br from-gray-400 to-gray-500 mb-10 rounded-xs'>
            
                    <ChartSchema coin = {coin} amount = {amount}></ChartSchema>
            
                </div> : <div className='flex items-center h-[200px]'>
                  <h1>Add coins to watch list to display there data here!</h1>
                </div> }
        </div>  
    </div>
  )
}

export default CryptoChartSection