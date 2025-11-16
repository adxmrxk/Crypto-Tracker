import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";
import { Pie, Line } from "react-chartjs-2";
import useHistoricalCryptoData from "../../hooks/useHistoricCryptoData";
import { Form } from "react-router";

Chart.register(CategoryScale);

const WalletValueChartSchema = ({ timeRange }) => {
  const { user, setUser } = useContext(UserContext);
  const oneHourAgo = React.useMemo(
    () => Math.floor(Date.now() / 1000) - 60 * 60,
    []
  );
  const oneDayAgo = React.useMemo(
    () => Math.floor(Date.now() / 1000) - 24 * 60 * 60,
    []
  );
  const oneWeekAgo = React.useMemo(
    () => Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 7,
    []
  );
  const oneMonthAgo = React.useMemo(
    () => Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 30,
    []
  );
  const threeMonthsAgo = React.useMemo(
    () => Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 90,
    []
  );

  const [from, setFrom] = useState(oneWeekAgo);
  const now = React.useMemo(() => Math.floor(Date.now() / 1000), [from]);
  let portfolioValue = 0;

  const chartData = {
    labels: ["a", "b", "c", "d"],
    datasets: [
      {
        label: ["a", "b", "c", "d"],
        data: [10, 20, 15, 30, 50, 45, 55, 37, 60, 80, 120, 90, 110],

        //How data looks

        borderColor: "#0f5fd6",
        fill: true,
        backgroundColor: "#fff",
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointBackgroundColor: "#ededed",
      },
    ],
  };

  return (
    <div className="w-[800px] h-[500px]">
      <Line
        className=""
        style={{ height: "100%", width: "100%" }}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0,
          plugins: {
            legend: {
              display: false,
              labels: {
                color: "#fff",
                font: { size: 12, weight: "semibold" },
                boxWidth: 20,
              },
            },

            tooltip: {
              mode: "index",
              intersect: false,
            },
          },

          scales: {
            x: {
              display: false,
            },

            y: {
              ticks: {
                callback: function (value, index, ticks) {
                  return "";
                },
              },

              grid: {
                drawTicks: false,
              },
            },
          },
        }}
      ></Line>
    </div>
  );
};

export default WalletValueChartSchema;
