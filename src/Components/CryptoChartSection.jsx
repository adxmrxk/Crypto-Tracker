import React from 'react'
import { useContext, createContext } from 'react'
import { UserContext } from '../Pages/Skeleton'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartSchema from '../utils/chartSchema';

ChartJS.register(ArcElement, Tooltip, Legend);

const CryptoChartSection = () => {

  const {user, setUser} = useContext(UserContext);

  return (
    <div className='flex gap-10 flex-col items-center justify-center'>
        <div className = 'ring ring-blue-200  w-[500px] h-[375px] shadow-2xl bg-gradient-to-br from-gray-400 to-gray-500 mb-10 mt-15'>
             {/* {user.watchList.length > 0 ? <ChartSchema></ChartSchema> : null} */}
             <ChartSchema></ChartSchema>
        </div>
        <button className='mb-5 bg-gradient-to-br from-yellow-400 to-yellow-500 ring ring-amber-600 px-5 rounded-xs '>b1</button>
    </div>
  )
}

export default CryptoChartSection