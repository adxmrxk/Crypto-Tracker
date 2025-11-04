import React, { useContext, useMemo } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { UserContext } from '../../Pages/SkeletonPage';

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);

const PerformanceBarChart = () => {
  const { user } = useContext(UserContext);

  const coinNames = user?.watchList.map(el => el.coin) || [];
  const coinAmounts = user?.watchList.map(el => el.amount) || [];

  // 🎨 Refined palette: navy, blue, teal, aqua (no grays)
  const basePalette = [
    '#0F172A', // deep navy
    '#1E3A8A', // rich blue
    '#2563EB', // strong blue
    '#0284C7', // medium blue
    '#0EA5E9', // bright cyan-blue
    '#14B8A6', // teal
    '#0891B2', // dark teal
    '#38BDF8', // light aqua
  ];

  // Generate extended tones if there are more coins than colors
  const generateExtendedPalette = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const base = basePalette[i % basePalette.length];
      const variation = 0.9 + ((i / count) * 0.2); // small brightness variation (0.9–1.1)
      colors.push(adjustColorBrightness(base, variation));
    }
    return colors;
  };

  // Adjust color brightness
  const adjustColorBrightness = (hex, factor) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, Math.floor(r * factor)));
    g = Math.min(255, Math.max(0, Math.floor(g * factor)));
    b = Math.min(255, Math.max(0, Math.floor(b * factor)));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const backgroundColors = useMemo(
    () => generateExtendedPalette(coinNames.length),
    [coinNames]
  );

  const chartData = {
    labels: coinNames,
    datasets: [
      {
        data: coinAmounts,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1.2,
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 1.2,
        spacing: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 0, // full pie
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: 'center',
        labels: {
          color: '#cbd5e1',
          padding: 20,
          boxWidth: 14,
          boxHeight: 14,
          usePointStyle: false, // ✅ squares
          font: { size: 13, weight: 500 },
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        cornerRadius: 6,
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percent}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 900,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="w-[350px] h-[270px] flex flex-col items-center">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PerformanceBarChart;
