import React from "react";
import WalletValueChartSchema from "./WalletValueChartSchema";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const WalletValueChart = ({ timeRange }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="w-[750px] h-[420px]">
      <WalletValueChartSchema timeRange={timeRange}></WalletValueChartSchema>
    </div>
  );
};

export default WalletValueChart;
