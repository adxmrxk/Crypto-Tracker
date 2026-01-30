import React, { useMemo, useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import useMultiHistorical from "../../hooks/useMultiHistoricCryptoData";

Chart.register(CategoryScale);

const WalletValueChartSchema = ({ timeRange }) => {
  const { user } = useContext(UserContext);

  const now = useMemo(() => Math.floor(Date.now() / 1000), []);

  const getFromTimestamp = useMemo(() => {
    switch (timeRange) {
      case "1H":
        return now - 60 * 60;
      case "24H":
        return now - 24 * 60 * 60;
      case "7D":
        return now - 7 * 24 * 60 * 60;
      case "1M":
        return now - 30 * 24 * 60 * 60;
      case "3M":
        return now - 90 * 24 * 60 * 60;
      default:
        return now - 7 * 24 * 60 * 60;
    }
  }, [timeRange, now]);

  const coins = user?.watchList?.map((coin) => coin.coin) || [];
  const { data: historicalData, isLoading } = useMultiHistorical(coins, getFromTimestamp, now);

  // Process historical data to calculate portfolio value over time
  const portfolioHistory = useMemo(() => {
    if (!historicalData || historicalData.length === 0 || !user?.watchList?.length) {
      return { labels: [], values: [] };
    }

    // Get price arrays from each coin's historical data
    const coinPrices = historicalData.map((coinData, index) => {
      const userCoin = user.watchList[index];
      return {
        amount: userCoin?.amount || 0,
        prices: coinData?.prices || []
      };
    });

    // Find the coin with the most data points to use as reference
    const maxLength = Math.max(...coinPrices.map(c => c.prices.length));
    if (maxLength === 0) return { labels: [], values: [] };

    // Sample data points (max 50 points for smooth chart)
    const sampleRate = Math.max(1, Math.floor(maxLength / 50));
    const labels = [];
    const values = [];

    for (let i = 0; i < maxLength; i += sampleRate) {
      let totalValue = 0;
      let timestamp = null;

      coinPrices.forEach((coin) => {
        if (coin.prices[i]) {
          if (!timestamp) timestamp = coin.prices[i][0];
          totalValue += coin.amount * coin.prices[i][1];
        }
      });

      if (timestamp) {
        const date = new Date(timestamp);
        let label;
        if (timeRange === "1H") {
          label = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (timeRange === "24H") {
          label = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
          label = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
        labels.push(label);
        values.push(totalValue);
      }
    }

    return { labels, values };
  }, [historicalData, user?.watchList, timeRange]);

  const chartData = {
    labels: portfolioHistory.labels,
    datasets: [
      {
        label: "Portfolio Value",
        data: portfolioHistory.values,
        borderColor: "#f59e0b",
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, "rgba(245, 158, 11, 0.35)");
          gradient.addColorStop(0.5, "rgba(251, 191, 36, 0.15)");
          gradient.addColorStop(1, "rgba(252, 211, 77, 0.02)");
          return gradient;
        },
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#f59e0b",
        pointHoverBorderColor: "#1e293b",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  // Empty state
  if (coins.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
          <span className="text-3xl grayscale opacity-60">📈</span>
        </div>
        <p className="text-gray-400 text-sm mb-1">No coins in your watchlist</p>
        <p className="text-gray-500 text-xs">Add coins to see your portfolio history</p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Line
        style={{ height: "100%", width: "100%" }}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              titleColor: "#f59e0b",
              titleFont: {
                size: 12,
                weight: "500",
              },
              bodyColor: "#fff",
              bodyFont: {
                size: 14,
                weight: "600",
              },
              padding: 14,
              cornerRadius: 12,
              displayColors: false,
              borderColor: "rgba(245, 158, 11, 0.2)",
              borderWidth: 1,
              callbacks: {
                label: function (context) {
                  return `$${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                },
              },
            },
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#64748b",
                maxTicksLimit: 8,
                font: {
                  size: 11,
                },
                padding: 8,
              },
            },
            y: {
              display: true,
              position: "right",
              grid: {
                color: "rgba(71, 85, 105, 0.3)",
                drawBorder: false,
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#64748b",
                font: {
                  size: 11,
                },
                padding: 12,
                callback: function (value) {
                  return "$" + value.toLocaleString();
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default WalletValueChartSchema;
