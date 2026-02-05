import React from "react";
import PortfolioDistributionSchema from "./PortfolioDistributionSchema";

const PortfolioDistribution = ({ cryptoData, isLoading, isFetching }) => {
  return (
    <div className="relative w-[420px] h-[395px]">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-blue-500/15 rounded-xl blur-lg"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-blue-950 rounded-lg border border-slate-600/50">
        <PortfolioDistributionSchema cryptoData={cryptoData} isLoading={isLoading} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default PortfolioDistribution;
