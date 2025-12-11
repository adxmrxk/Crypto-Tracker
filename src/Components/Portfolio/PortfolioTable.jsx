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

  return (
    <div className="w-[800px]">
      <div className="grid grid-cols-9 border-t border-l border-b border-sky-300">
        <div className="px-2 py-2 font-semibold  border-sky-300">Coin</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">Ticker</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">Price</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">1H</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">24H</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">7D</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">MKT Cap</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">ATH</div>
        <div className="px-2 py-2 font-semibold  border-sky-300">VLME</div>
      </div>

      <div className="">
        {user?.watchList?.map((coin, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-9 border-l border-b border-sky-300"
            >
              <div className="px-4 py-4 text-sm  border-sky-300">
                {coin.coin}
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                {coin.ticker}
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">$42,000</div>
              <div className="px-4 py-4 text-sm  border-sky-300">+2.7%</div>
              <div className="px-4 py-4 text-sm  border-sky-300">-3.7%</div>
              <div className="px-4 py-4 text-sm  border-sky-300">-10.3%</div>
              <div className="px-4 py-4 text-sm  border-sky-300">
                $1,321,321
              </div>
              <div className="px-4 py-4 text-sm  border-sky-300">$125,000</div>
              <div className="px-4 py-4 text-sm  border-sky-300">$23,000</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioTable;
