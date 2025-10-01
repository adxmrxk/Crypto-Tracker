import React, {useEffect, useState, useRef} from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";





Chart.register(CategoryScale);

const FakeChart = ( {coin, amount} ) => {

  
 
 
const chartRef = useRef(null);

  const getGradient = (ctx, chartArea) => {
    if (!chartArea) return "rgba(253, 186, 116, 0.25)"; // fallback color

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

    gradient.addColorStop(0, "rgba(253, 186, 116, 0.25)"); // orange-300
    gradient.addColorStop(0.6, "rgba(244, 63, 94, 0.20)"); // rose-500
    gradient.addColorStop(1, "rgba(168, 85, 247, 0.10)");  // purple-500

    return gradient;
  };



  

  
  
  const chartData = {

    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        data: [120, 542, 821, 451, 256, 943, 1240, 1543, 1100, 1300],


        borderColor: "#fff",
        fill: true, 

        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          return getGradient(ctx, chartArea);
        }, 
        tension: 0.5, 
        borderWidth: 0.5,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointBackgroundColor: '#ededed',
        

      },
    ],
  };

  return (
    <div data-aos="fade-right" data-aos-offset="275">
      <div className='flex flex-col absolute translate-x-3 translate-y-18'>
        <h1 className='font-bold text-3xl translate-x-8 translate-y-5 text-gray-200'>$57,456</h1>
        <p className='font-semibold text-xl translate-x-7.5 translate-y-5 bg-green-500/40 text-green-400 rounded-xs w-fit px-2 ml-4 mt-2'>+3.64%</p>
      </div>
      <div className='w-[550px] h-[450px] flex items-center mt-15'>
        <div>
          <h2></h2>
        </div>
        <Line
        
        
          data={chartData}
          options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: {
                      display: false
                  },
                  tooltip: {
                      enabled: false,
      
                  }
              },
      
              scales: {
                  x: {
                    display: true,
                  grid: {
                    drawTicks: false,
                  }
                  },
                  y: {
                      ticks: {
                          callback: () => ""
                      },
      
                  grid: {
                          drawTicks: false
                       }
                  }
              }
          }}/>
          
      
      </div>
    </div>

    
  );
}


export default FakeChart