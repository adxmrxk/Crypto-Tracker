import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PortfolioDistributionSchema = ({ cryptoData, isLoading, isFetching }) => {
  const { user } = useContext(UserContext);

  const watchList = user?.watchList || [];
  const hasCoins = watchList.length > 0;

  const coins = watchList.map((coin) => coin.coin);
  const data = cryptoData;

  const AmountToPrice =
    data?.map((coin) => {
      const entry = user?.watchList?.find((item) => item.coin === coin.id);
      return {
        amount: entry?.amount || 0,
        price: coin.current_price,
        ticker: coin.symbol,
        name: coin.name,
        image: coin.image,
      };
    }) || [];

  // Calculate total portfolio value
  const totalValue = AmountToPrice.reduce(
    (sum, coin) => sum + coin.amount * coin.price,
    0
  );

  const chartData = {
    labels: AmountToPrice.map((coin) => coin.ticker?.toUpperCase()),
    datasets: [
      {
        data: AmountToPrice.map((coin) => coin.amount * coin.price),
        backgroundColor: [
          "#f59e0b", // amber
          "#d97706", // darker amber
          "#fbbf24", // light amber
          "#b45309", // brown amber
          "#f97316", // orange
          "#ea580c", // darker orange
          "#fdba74", // light orange
          "#c2410c", // burnt orange
        ],
        borderColor: "rgba(30, 41, 59, 0.8)",
        borderWidth: 2,
        hoverOffset: 1,
        hoverBorderColor: "#fff",
        hoverBorderWidth: 2,
      },
    ],
  };

  // Empty state when no coins in watchlist
  if (!hasCoins) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <h1 className="text-xl font-bold mb-4 text-gray-200">Distribution</h1>
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
          <span className="text-3xl grayscale opacity-60">📊</span>
        </div>
        <p className="text-sm text-center mb-1">No coins in your watchlist</p>
        <p className="text-gray-500 text-xs">Add coins to see your portfolio distribution</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold text-gray-200">Distribution</h1>
          <p className="text-sm text-gray-400">
            Total: <span className="text-amber-400 font-semibold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="text-xs text-amber-400 animate-pulse">
            Updating...
          </span>
        )}
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[180px] h-[180px]">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  titleColor: "#f59e0b",
                  bodyColor: "#e2e8f0",
                  padding: 12,
                  cornerRadius: 8,
                  titleFont: {
                    size: 13,
                    weight: "bold",
                  },
                  bodyFont: {
                    size: 12,
                  },
                  callbacks: {
                    title: function (context) {
                      const coin = AmountToPrice[context[0].dataIndex];
                      return coin.name;
                    },
                    label: function (context) {
                      const coin = AmountToPrice[context.dataIndex];
                      const value = coin.amount * coin.price;
                      const percentage = ((value / totalValue) * 100).toFixed(
                        1
                      );
                      return [
                        `${coin.amount} ${coin.ticker?.toUpperCase()}`,
                        `$${value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`,
                        `${percentage}% of portfolio`,
                      ];
                    },
                  },
                },
              },
              animation: {
                animateRotate: true,
                animateScale: true,
              },
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="h-[120px] mt-3 overflow-y-scroll pr-0 hover:pr-3 transition-all duration-300 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:transition-all [&::-webkit-scrollbar]:duration-300 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-thumb]:bg-slate-400/60 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="grid grid-cols-2 gap-1.5">
          {AmountToPrice.map((coin, index) => {
            const value = coin.amount * coin.price;
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-1.5 rounded-md bg-slate-800/40 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-200">
                    {coin.ticker?.toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-400">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDistributionSchema;
