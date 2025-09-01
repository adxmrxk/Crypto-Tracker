import React from 'react'
import { useContext, createContext } from 'react'
import { UserContext } from '../Pages/Skeleton'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartSchema from '../utils/chartSchema';

ChartJS.register(ArcElement, Tooltip, Legend);



const CryptoChartSection = () => {

  const {user, setUser} = useContext(UserContext);

  const now = Math.floor(Date.now() / 1000); 
  const oneHourAgo = now - 60 * 60; 
  const yesterday = now - 24 * 60 * 60; 
  const oneWeekAgo = now - 24 * 60 * 60 * 7;
  const oneMonthAgo = now - 24 * 60 * 60 * 30;
  const threeMonthsAgo = now - 24 * 60 * 60 * 90;
  

  return (
    <div className='flex gap-10 flex-col items-center'>
        <div className = 'ring-1 ring-blue-200  w-[550px] h-[400px] shadow-2xl bg-gradient-to-br from-gray-400 to-gray-500 mb-10 mt-15 rounded-xs'>
             {/* {user.watchList.length > 0 ? <ChartSchema  coin= 'bitcoin' amount = '0.25></ChartSchema> : null} */}
             
             
             {user.watchList ? user.watchList.map((element, index) => {
                return <ChartSchema coin = {element.coin} amount = {element.amount} key = {index}></ChartSchema>
             }) : null}
             
        </div>
    </div>
  )
}

export default CryptoChartSection