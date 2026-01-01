import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import useMultiHistorical from "../../hooks/useMultiHistoricCryptoData";

const PortfolioTable = () => {
  const { user, setUser } = useContext(UserContext);

  const coins = user?.watchList?.map((coin) => coin.coin) || [];

  console.log("PortfolioTable.jsx: ", coins);
  const now = Math.floor(Date.now() / 1000);
  const oneHourAgo = now - 60 * 60;
  const oneDayAgo = now - 24 * 60 * 60;
  const sevenDaysAgo = now - 7 * 24 * 60 * 60;

  const { dataOneHourAgo, isLoading, error } = useMultiHistorical(
    coins,
    oneHourAgo,
    now
  );
  const { dataOneDayAgo } = useMultiHistorical(coins, oneDayAgo, now);
  const { dataSevenDaysAgo } = useMultiHistorical(coins, sevenDaysAgo, now);

  console.log("PortfolioTable.jsx Historical Coin Data: ", dataOneHourAgo);

  if (coins.length === 0) {
    return (
      <div className="w-[800px] h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900  p-3">
        <h1 className="text-xl font-bold mb-4 text-gray-200">
          Wallet Breakdown
        </h1>
        <p className="text-sm">No assets in portfolio</p>
      </div>
    );
  }

  return (
    <div className="w-[800px] h-[400px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3">
      <h1 className="text-left mb-5 text-xl font-bold  text-gray-200">
        Wallet Breakdown
      </h1>
      <div className="grid grid-cols-8 border-t border-l border-b border-sky-300">
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          Coin
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          Ticker
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          Price
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          1H
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          24H
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          7D
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          MKT Cap
        </div>
        <div className="px-2 py-2 font-semibold  border-sky-300 text-blue-100">
          ATH
        </div>
      </div>

      <div className="">
        {dataOneHourAgo?.map((coin, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-8 border-l border-b border-sky-300 items-center justify-center"
            >
              <div className="px-4 py-4 text-sm  border-sky-300 flex flex-row gap-2">
                {
                  <img
                    src={coin.image}
                    className="w-[24px] h-[24px] rounded-full"
                    alt={coin.coin}
                  ></img>
                }
                <h1>
                  {coin.coin.slice(0, 1).toUpperCase() + coin.coin.slice(1)}
                </h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1>{coin.ticker.toUpperCase()}</h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1></h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1>+2.7%</h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1>-3.7%</h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1>-10.3%</h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1>$1,321,321</h1>
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                <h1>$125,000</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioTable;
