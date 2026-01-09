import React from "react";
import PortfolioDistributionSchema from "./PortfolioDistributionSchema";

const PortfolioDistribution = ({ cryptoData, isLoading, isFetching }) => {
  return (
    <div className="w-[420px] h-[395px] bg-gradient-to-br from-slate-900 to-blue-950">
      <PortfolioDistributionSchema cryptoData={cryptoData} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
};

export default PortfolioDistribution;
