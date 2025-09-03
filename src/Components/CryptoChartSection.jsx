import React from 'react'
import { useContext, createContext } from 'react'
import { UserContext } from '../Pages/Skeleton'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartSchema from '../utils/chartSchema';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

ChartJS.register(ArcElement, Tooltip, Legend);



const CryptoChartSection = () => {

  const {user, setUser} = useContext(UserContext);

  const now = Math.floor(Date.now() / 1000); 
  const oneHourAgo = now - 60 * 60; 
  const yesterday = now - 24 * 60 * 60; 
  const oneWeekAgo = now - 24 * 60 * 60 * 7;
  const oneMonthAgo = now - 24 * 60 * 60 * 30;
  const threeMonthsAgo = now - 24 * 60 * 60 * 90;
  
    var settings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true

    };


  return (
    <div className='flex gap-10 flex-col items-center'>
        <div className='w-[550px] h-[400px] mb-30'>
          <Slider {...settings }>
            { user.watchList ? user.watchList.map((element, index) => {
                return <div className = 'ring-1 ring-blue-200  w-[550px] h-[400px] shadow-xl bg-gradient-to-br from-gray-400 to-gray-500 mb-10 mt-15 rounded-xs'>
            
                    <ChartSchema coin = {element.coin} amount = {element.amount} key = {index}></ChartSchema>
            
                </div>}) : <div className='flex items-center h-[200px]'>
                  <h1>Add coins to watch list to display there data here!</h1>
                </div> }
          </Slider>
        </div>      
    </div>
  )
}

export default CryptoChartSection