import React from "react";
import WalletValueChartSchema from "./WalletValueChartSchema";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const WalletValueChart = ({ timeRange }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="">
      <div className="w-[800px] h-[500px] ">
        <WalletValueChartSchema timeRange={timeRange}></WalletValueChartSchema>
      </div>
    </div>
  );
};

export default WalletValueChart;
