import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Scrollbar } from "react-scrollbars-custom";

const PortfolioDistributionSchema = ({ cryptoData, isLoading, isFetching }) => {
  const { user } = useContext(UserContext);

  const coins = user?.watchList?.map((coin) => coin.coin) || [];
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
        hoverOffset: 12,
        hoverBorderColor: "#fff",
        hoverBorderWidth: 2,
      },
    ],
  };

  // COMMENTED OUT FOR TESTING - UNCOMMENT WHEN DONE
  // if (coins.length === 0) {
  //   return (
  //     <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
  //       <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-600 flex items-center justify-center mb-4">
  //         <span className="text-2xl">%</span>
  //       </div>
  //       <h1 className="text-lg font-semibold mb-2 text-gray-300">
  //         Portfolio Distribution
  //       </h1>
  //       <p className="text-sm text-gray-500">No assets in portfolio</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-gray-200">
          Distribution
        </h1>
        {isFetching && !isLoading && (
          <span className="text-xs text-amber-400 animate-pulse">Updating...</span>
        )}
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-[180px] h-[180px]">
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: "65%",
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
                      const percentage = ((value / totalValue) * 100).toFixed(1);
                      return [
                        `${coin.amount} ${coin.ticker?.toUpperCase()}`,
                        `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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
        {/* Center Total */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total</p>
            <p className="text-lg font-bold text-gray-100">
              ${totalValue >= 1000
                ? `${(totalValue / 1000).toFixed(1)}k`
                : totalValue.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <Scrollbar
        style={{ height: 120, marginTop: 12 }}
        trackYProps={{
          style: {
            width: 4,
            background: "rgba(51, 65, 85, 0.5)",
            borderRadius: 4,
          },
        }}
        thumbYProps={{
          style: {
            background: "rgba(245, 158, 11, 0.6)",
            borderRadius: 4,
          },
        }}
      >
        <div className="grid grid-cols-2 gap-1.5 pr-2">
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
                      backgroundColor: chartData.datasets[0].backgroundColor[index],
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
      </Scrollbar>
    </div>
  );
};

export default PortfolioDistributionSchema;
