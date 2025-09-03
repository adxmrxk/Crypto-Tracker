import React, { useState, useContext, useRef, useEffect } from 'react'
import { UserContext } from '../Pages/Skeleton'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import { Pie, Line } from "react-chartjs-2";
import useHistoricalCryptoData from '../hooks/useHistoricCryptoData';

Chart.register(CategoryScale);


const ChartSchema = ( {coin, amount} ) => {

  const [timeDisplay, setTimeDisplay] = useState(1);
  
  /*  const {user, setUser} = useContext(UserContext);
  const watchListArray = user?.watchList || [];
  const coins = watchListArray.map((item) => item.coin); 
  
  const {data, error} = useCryptoCurrency(coins);
  
  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  
  */ 
 
 const chartRef = useRef(null)
 const [gradient, setGradient] = useState("rgba(42,113,208,0.15)")
 
 useEffect(() => {
   if (chartRef.current) {
     const ctx = chartRef.current.ctx
     const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
     grad.addColorStop(0, "rgba(42, 113, 208, 0.20)");  // top, darker
     grad.addColorStop(0.6, "rgba(42, 113, 208, 0.15)"); // middle
     grad.addColorStop(1, "rgba(42, 113, 208, 0.05)"); // bottom, almost transparent but still visible  
     setGradient(grad)
    }
  }, [])
  
  //TODO: 
  
  //Set up a second API to get historical data of a certain coin (https://docs.coingecko.com/reference/coins-id-market-chart-range).
  //Set up the API to basically get the coins in the watch list then for each coin then call the second api to get the data for that coin in its time range (1 hour, 24 hours, 1 week, 3 months).
  //Make a carousel type of thing to display all the coins on these graphs.
  //Finish up any final styling on the graph.
  
const oneHourAgo = React.useMemo(() => Math.floor(Date.now() / 1000) - 60 * 60, []);
const oneDayAgo = React.useMemo(() => Math.floor(Date.now() / 1000) - 24 * 60 * 60, []);
const oneWeekAgo = React.useMemo(() => Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 7, []);
const oneMonthAgo = React.useMemo(() => Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 30, []);
const threeMonthsAgo = React.useMemo(() => Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 90, []);
  
const [from, setFrom] = useState(oneWeekAgo);
const now = React.useMemo(() => Math.floor(Date.now() / 1000), [from]);

  const {data, error, isLoading} = useHistoricalCryptoData(coin, from, now);
  const prices = [];
  const dates = [];
  let relativePrices = [];
  if (data) {
    for (let i = 0; i < data.prices.length; i++) {
      for (let j = 0; j <= data.prices[i].length; j++) {


        
        
        if (j === 0) {
          const unixTimeStamp = data.prices[i][j];
          const dateObject = new Date(unixTimeStamp);
          const hours = dateObject.getHours();
          const minutes = dateObject.getMinutes();
          const timeString = `${hours}:${minutes}: EST`;

          dates.push(timeString);
        } 

        if (j === 1) {

          prices.push(data.prices[i][j]);
          
        }

      }

      relativePrices = prices.map((price, index) => {

          return price * amount;

      })


    }

    
  }
  
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: coin,
        /*data: data.map((item, index) => Number(item.current_price.toFixed(2) * watchListArray[index].amount))*/
        data: relativePrices,

        //How data looks

        borderColor: "#0f5fd6",
        fill: true, 
        backgroundColor: gradient, 
        tension: 0.3, 
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointBackgroundColor: '#ededed',
        

      },
    ],
  };

  return (
    <div className='mt-5 px-2 flex flex-col items-center'>
      <div className='w-full items-center'>
        <h2 className='font-semibold text-xl text-gray-200 underline underline-offset-2 shadow-2xl mt-3 mb-3'>{coin.charAt(0).toUpperCase() + coin.slice(1)}</h2>
      </div>
      <Line 
        ref={chartRef} 
        data={chartData} 

        //How the chart looks

        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
              labels: {
                color: "#fff", 
                font: { size: 12, weight: "semibold" },
                boxWidth: 20
              },
            },

            tooltip: {
              mode: "index",
              intersect: false
            }

          },

           scales: {
              x: {
                display: false
              }, 

              y: {
                ticks: {
                  callback: function(value, index, ticks) {
                    
                    return ""; 
                    
                  },
                  
              },

              grid: {
                drawTicks: false
              }
            }
          
        }}}
      />
      <div className='mt-7 h-fit bg-gradient-to-br from-yellow-400/80 to-yellow-500/90 px-3 rounded-full flex gap-2 shadow-2xl'>
        <button className='text-sm font-semibold text-gray-600 px-2 py-1 my-0.5 hover:bg-amber-300 hover:rounded-full transition-all duration-200 cursor-pointer' onClick={() => setFrom(oneHourAgo)}>1H</button>
        <button className='text-sm font-semibold text-gray-600 px-2 py-1 my-0.5 hover:bg-amber-300 hover:rounded-full transition-all duration-200 cursor-pointer' onClick={() => setFrom(oneDayAgo)}>24H</button>
        <button className='text-sm font-semibold text-gray-600 px-2 py-1 my-0.5 hover:bg-amber-300 hover:rounded-full transition-all duration-200 cursor-pointer' onClick={() => setFrom(oneWeekAgo)}>1W</button>
        <button className='text-sm font-semibold text-gray-600 px-2 py-1 my-0.5 hover:bg-amber-300 hover:rounded-full transition-all duration-200 cursor-pointer' onClick={() => setFrom(oneMonthAgo)}>1M</button>
        <button className='text-sm font-semibold text-gray-600 px-2 py-1 my-0.5 hover:bg-amber-300 hover:rounded-full transition-all duration-200 cursor-pointer' onClick={() => setFrom(threeMonthsAgo)}>3M</button>
      </div>
    </div>

    
  );
}

export default ChartSchema
