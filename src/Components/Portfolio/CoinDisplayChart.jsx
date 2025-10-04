import React, {useEffect, useState, useRef, useContext} from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { UserContext } from '../../Pages/SkeletonPage';
import useCryptoCurrency from '../../hooks/useCryptoCurrency';





Chart.register(CategoryScale);

const CoinDisplayChart = ( {coin, amount} ) => {

const {user, setUser } = useContext(UserContext);

const coinNames = user?.watchList.map((element, index) => {
  return element.coin;

})


const coinAmounts = user?.watchList.map((element, index) => {
  return element.amount;

})


 
const chartRef = useRef(null);

const generateColors = (count) => {
  return Array.from({ length: count }, (_, i) => {
    // Hue fixed in blue range (200–240)
    const hue = 220;  

    // Step saturation and lightness so every slice is unique
    const saturation = 40 + (i * 10) % 50;  // cycle between 40–90%
    const lightness = 25 + (i * 7) % 40;   // cycle between 25–65%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });
};

const backgroundColors = generateColors(coinNames.length);

  
  
  const chartData = {

    labels: coinNames,
    datasets: [
      {

        data: coinAmounts,
        backgroundColor: backgroundColors,  // ✅ one color per slice
        borderColor: "#fff",
        borderWidth: 0.5,


      },
    ],
  };

  return (
      <div className='w-[350px] h-[250px] -translate-x-13 -translate-y-10'>
          <Pie
            data={chartData}
      
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
      
                        backgroundColor: '#1e293b',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        borderWidth: 1,
                        displayColors: true,
                        cornerRadius: 0,
      
                        callbacks: {
                          label: function(context) {
                          let label = context.label || '';
                          let value = context.raw;
                          return `${label}: ${value}`;
                        },
      
      
                    }
                },
      
      
                scales: {
      
                }
            }}}/>
      
      
        </div>

    
  );
}


export default CoinDisplayChart
