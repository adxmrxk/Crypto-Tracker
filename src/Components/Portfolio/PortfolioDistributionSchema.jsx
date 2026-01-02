import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";

const PortfolioDistributionSchema = () => {
  const { user, setUser } = useContext(UserContext);

  const coins = user?.watchList?.map((coin) => coin.coin) || [];

  const { data, isLoading, error } = useCryptoCurrency(coins);

  const AmountToPrice =
    data?.map((coin) => {
      const entry = user?.watchList?.find((item) => item.coin === coin.id);
      return {
        amount: entry?.amount,
        price: coin.current_price,
        ticker: coin.symbol,
      };
    }) || [];

  const chartData = {
    labels: AmountToPrice.map((coin) => coin.ticker),
    datasets: [
      {
        data: AmountToPrice.map((coin) => coin.amount * coin.price),
        borderColor: "#ffffff",
        backgroundColor: [
          "#d97706", // muted orange
          "#f2873f", // soft terracotta
          "#d6a600", // mustard yellow
          "#c75c2b", // burnt orange
          "#eab308", // golden mustard
          "#d97706", // darker amber
          "#fbbf24", // light amber
          "#f4a261", // soft peach/orange
        ],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  if (coins.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <h1 className="text-xl font-bold mb-4 text-gray-200">
          Portfolio Distribution
        </h1>
        <p className="text-sm">No assets in portfolio</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold flex justify-center text-gray-200">
        Portfolio Distribution
      </h1>

      <div className="h-[250px] p-2">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "30%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                backgroundColor: "#1e293b",
                titleColor: "#fff",
                bodyColor: "#e2e8f0",
                padding: 10,
                cornerRadius: 6,
                callbacks: {
                  label: function (context) {
                    const coin = AmountToPrice[context.dataIndex];
                    return `${coin.amount} ${coin.ticker} ($${(
                      coin.amount * coin.price
                    ).toLocaleString()})`;
                  },
                },
              },
            },
            animation: {
              animateRotate: true,
              animateScale: true,
            },
            layout: {
              padding: 10,
            },
          }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 mt-2 w-[80%]">
        {AmountToPrice.map((coin, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xs bg-slate-800/30 hover:bg-slate-700/40 hover:scale-105 transition-all duration-250"
          >
            <div
              className="w-3 h-3 flex-shrink-0"
              style={{
                backgroundColor: chartData.datasets[0].backgroundColor[index],
              }}
            />
            <span className="text-sm font-semibold text-gray-100">
              {coin.ticker[0].toUpperCase() + coin.ticker.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDistributionSchema;
