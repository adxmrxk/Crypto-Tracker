import React from 'react'
import WalletValueChartSchema from './WalletValueChartSchema'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


const WalletValueChart = () => {

  ChartJS.register(ArcElement, Tooltip, Legend);
  
  return (
    <div className=''>
        <div className='border-2 w-[800px] h-[500px] border-red-500'>
            <WalletValueChartSchema></WalletValueChartSchema>
        </div>
    </div>
  )
}

export default WalletValueChart