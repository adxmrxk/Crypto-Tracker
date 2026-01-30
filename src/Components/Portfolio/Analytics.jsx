import React, { useContext } from "react";
import WalletValue from "./WalletValue";
import TopWinners from "./TopWinners";
import WatchList from "./WatchList";
import PortfolioDistribution from "./PortfolioDistribution";
import PortfolioTable from "./PortfolioTable";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";

const Analytics = () => {
  const { user } = useContext(UserContext);

  // Fetch crypto data ONCE here and pass to children
  const coins = user?.watchList?.map((coin) => coin.coin) || [];
  const { data: cryptoData, isLoading, isFetching } = useCryptoCurrency(coins);

  // Only show loading on first load when there's no data at all
  const showLoading = isLoading && !cryptoData;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold pt-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
          Investment Overview
        </h1>
        <p className="text-lg mb-15 text-gray-400">
          Your portfolio at a glance — track, analyze, and optimize your
          investments.
        </p>
        <hr className="border-slate-600 my-1 w-[40%] mx-auto mt-5"></hr>
      </div>
      <div className="flex flex-row justify-center ">
        <WalletValue cryptoData={cryptoData} isLoading={showLoading} isFetching={isFetching} />
      </div>
      <div className="ml-80 mt-15 pb-10">
        <div className="flex flex-row justify-between w-[1280px] ">
          <PortfolioTable cryptoData={cryptoData} isLoading={showLoading} isFetching={isFetching} />
          <PortfolioDistribution cryptoData={cryptoData} isLoading={showLoading} isFetching={isFetching} />
        </div>
        <WatchList></WatchList>
      </div>
    </div>
  );
};

export default Analytics;
