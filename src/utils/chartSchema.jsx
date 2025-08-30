import React, { useState, useContext, useRef, useEffect } from 'react'
import { UserContext } from '../Pages/Skeleton'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import { Pie, Line } from "react-chartjs-2";

Chart.register(CategoryScale);

const ChartSchema = () => {
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

  const chartData = {
    labels: [5, 10, 15, 20, 25, 30, 35, 40], 
    datasets: [
      {
        label: 'coins',
        /*data: data.map((item, index) => Number(item.current_price.toFixed(2) * watchListArray[index].amount))*/
        data: [
          { x: new Date('2025-08-29T10:00:00'), y: 10 },
          { x: new Date('2025-08-29T10:05:00'), y: 25 },
          { x: new Date('2025-08-29T10:10:00'), y: 17 },
          { x: new Date('2025-08-29T10:15:00'), y: 55 },
          { x: new Date('2025-08-29T10:20:00'), y: 34 },
          { x: new Date('2025-08-29T10:25:00'), y: 85 },
          { x: new Date('2025-08-29T10:30:00'), y: 100 },
          { x: new Date('2025-08-29T10:35:00'), y: 49 },
        ],
        borderColor: "#0f5fd6",
        fill: true, // shaded area under the line
        backgroundColor: gradient, 
        tension: 0.1, // makes line smooth instead of sharp
        borderWidth: 1,
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  return (
    <div className='mt-5 px-2'>
      <h2 className='font-semibold text-gray-900 '>{`Value of coin Holdings`}</h2>
      <Line 
        ref={chartRef} 
        data={chartData} 
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#fff", // legend text color
                font: { size: 12, weight: "semibold" },
                boxWidth: 20
              },
            },
          },
        }}
      />
    </div>
  );
}

export default ChartSchema
