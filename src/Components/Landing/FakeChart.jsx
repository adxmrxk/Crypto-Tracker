import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

const FakeChart = () => {

  const getGradient = (ctx, chartArea) => {
    if (!chartArea) return "rgba(253, 186, 116, 0.3)";

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

    gradient.addColorStop(0, "rgba(253, 186, 116, 0.35)");
    gradient.addColorStop(0.5, "rgba(244, 63, 94, 0.2)");
    gradient.addColorStop(1, "rgba(168, 85, 247, 0.05)");

    return gradient;
  };

  const dataValues = [120, 542, 821, 451, 256, 943, 1240, 1543, 1100, 1300];
  const highlightIndex = 3;

  const chartData = {
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        data: dataValues,
        borderColor: "rgba(255, 255, 255, 0.9)",
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          return getGradient(ctx, chartArea);
        },
        tension: 0.4,
        borderWidth: 1.5,
        pointRadius: dataValues.map((_, i) =>
          [1, 3, 5, 7, 9].includes(i) ? 2 : 0
        ),
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(253, 186, 116, 0.8)',
        pointBorderWidth: 1,
        pointHoverRadius: dataValues.map((_, i) =>
          [1, 3, 5, 7, 9].includes(i) ? 2 : 0
        ),
      },
    ],
  };

  const priceLabel = {
    id: 'priceLabel',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const point = meta.data[highlightIndex];

      if (point) {
        const x = point.x;
        const y = point.y;

        ctx.save();

        // Create gradient background
        const gradient = ctx.createLinearGradient(x - 36, y - 38, x + 36, y - 12);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x - 36, y - 38, 72, 26, 6);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('$36,391', x, y - 20);
        ctx.restore();
      }
    }
  };

  return (
    <div data-aos="fade-right" data-aos-offset="275">
      <div className='flex flex-col absolute translate-x-3 translate-y-18'>
        <h1 className='font-bold text-4xl translate-x-8 translate-y-5 text-gray-100'>$57,456</h1>
        <p className='font-semibold text-lg translate-x-7.5 translate-y-5 bg-emerald-500/30 text-emerald-400 rounded-md w-fit px-3 py-0.5 ml-4 mt-2'>+3.64%</p>
      </div>
      <div className='w-[550px] h-[450px] flex items-center mt-15'>
        <Line
          data={chartData}
          plugins={[priceLabel]}
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
                      color: 'rgba(100, 116, 139, 0.08)',
                      drawTicks: false,
                    },
                    ticks: {
                      display: false
                    },
                    border: {
                      display: false
                    }
                  },
                  y: {
                    display: true,
                    grid: {
                      color: 'rgba(100, 116, 139, 0.08)',
                      drawTicks: false,
                    },
                    ticks: {
                      display: false
                    },
                    border: {
                      display: false
                    }
                  }
              }
          }}
        />
      </div>
    </div>
  );
}

export default FakeChart
