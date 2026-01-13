import React, { useContext } from "react";
import { useState } from "react";
import WalletValueChart from "./WalletValueChart";
import RiskAndActivity from "./RiskAndActivity";
import AllTransactions from "./AllTransactions";
import { UserContext } from "../../Pages/SkeletonPage";

const WalletValue = ({ cryptoData, isLoading, isFetching }) => {
  const [timeRange, setTimeRange] = useState("1H");
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const { user } = useContext(UserContext);

  const coins = user?.watchList?.map((coin) => coin.coin) || [];
  const data = cryptoData;

  // Calculate total wallet value
  const totalWalletValue =
    data?.reduce((total, coin) => {
      const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
      if (userCoin) {
        return total + userCoin.amount * coin.current_price;
      }
      return total;
    }, 0) || 0;

  // Calculate 24h change
  const totalChange24h =
    data?.reduce((total, coin) => {
      const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
      if (userCoin) {
        const coinValue = userCoin.amount * coin.current_price;
        const changePercent = coin.price_change_percentage_24h || 0;
        return total + (coinValue * changePercent) / 100;
      }
      return total;
    }, 0) || 0;

  const changePercent =
    totalWalletValue > 0
      ? (totalChange24h / (totalWalletValue - totalChange24h)) * 100
      : 0;

  const hasCoins = coins.length > 0;

  return (
    <div className="flex flex-row justify-between w-[1280px] mx-auto">
      <div className="">
        <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-600 p-2">
          {!hasCoins ? (
            /* Empty State - No coins in watchlist */
            <div className="w-[800px] h-[500px] flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold mb-4 text-gray-200">Wallet Value</h1>
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
                <span className="text-3xl grayscale opacity-60">📈</span>
              </div>
              <p className="text-sm text-center mb-1 text-gray-400">No coins in your watchlist</p>
              <p className="text-gray-500 text-xs">Add coins to see your portfolio value</p>
            </div>
          ) : (
            /* Normal State - Has coins */
            <>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-left text-gray-300">Wallet Value</h1>
                    {isFetching && !isLoading && (
                      <span className="text-xs text-blue-400 animate-pulse">
                        Updating...
                      </span>
                    )}
                  </div>
                  <h2 className="text-left text-2xl font-semibold mt-2 mb-3">
                    {isLoading ? (
                      <span className="text-gray-400">Loading...</span>
                    ) : (
                      `$${totalWalletValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    )}
                  </h2>
                </div>
                <div className="flex items-center">
                  <ul className="flex flex-row gap-3">
                    <li
                      className={`border  ${
                        timeRange === "1H" ? "border-yellow-400" : "border-gray-700"
                      }  px-4 rounded-md ${
                        timeRange !== "1H"
                          ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        setTimeRange("1H");
                      }}
                    >
                      1H
                    </li>
                    <li
                      className={`border  ${
                        timeRange === "24H"
                          ? "border-yellow-400"
                          : "border-gray-700"
                      }  px-4 rounded-md  ${
                        timeRange !== "24H"
                          ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        setTimeRange("24H");
                      }}
                    >
                      24H
                    </li>
                    <li
                      className={`border  ${
                        timeRange === "7D" ? "border-yellow-400" : "border-gray-700"
                      }  px-4 rounded-md ${
                        timeRange !== "7D"
                          ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        setTimeRange("7D");
                      }}
                    >
                      7D
                    </li>
                    <li
                      className={`border  ${
                        timeRange === "1M" ? "border-yellow-400" : "border-gray-700"
                      }  px-4 rounded-md ${
                        timeRange !== "1M"
                          ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        setTimeRange("1M");
                      }}
                    >
                      1M
                    </li>
                    <li
                      className={`border ${
                        timeRange === "3M" ? "border-yellow-400" : "border-gray-700"
                      }  px-4 rounded-md ${
                        timeRange !== "3M"
                          ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        setTimeRange("3M");
                      }}
                    >
                      3M
                    </li>
                  </ul>
                </div>
              </div>
              <WalletValueChart timeRange={timeRange} />
            </>
          )}
        </div>
        {hasCoins && (
          <div className="flex flex-row gap-3 pt-3">
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-600 rounded-lg w-[180px] py-4 px-3">
              <h1 className="text-xs text-gray-400 mb-1">Total Holdings</h1>
              <h2 className="text-lg font-semibold text-gray-100">
                {coins.length} {coins.length === 1 ? "Coin" : "Coins"}
              </h2>
            </div>
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-600 rounded-lg w-[180px] py-4 px-3">
              <h1 className="text-xs text-gray-400 mb-1">24h Change</h1>
              <h2
                className={`text-lg font-semibold ${
                  totalChange24h >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isLoading
                  ? "..."
                  : `${totalChange24h >= 0 ? "+" : ""}$${Math.abs(
                      totalChange24h
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </h2>
            </div>
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-600 rounded-lg w-[180px] py-4 px-3">
              <h1 className="text-xs text-gray-400 mb-1">Best Performer</h1>
              <h2 className="text-lg font-semibold text-emerald-400">
                {isLoading
                  ? "..."
                  : data?.length > 0
                  ? `${
                      data
                        .reduce(
                          (best, coin) =>
                            (coin.price_change_percentage_24h || 0) >
                            (best.price_change_percentage_24h || 0)
                              ? coin
                              : best,
                          data[0]
                        )
                        ?.symbol?.toUpperCase() || "-"
                    }`
                  : "-"}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className=" w-[420px]">
        <RiskAndActivity onViewAllClick={() => setShowAllTransactions(true)} />
      </div>

      {/* All Transactions Modal */}
      {showAllTransactions && (
        <AllTransactions
          showAllTransactions={showAllTransactions}
          setShowAllTransactions={setShowAllTransactions}
        />
      )}
    </div>
  );
};

export default WalletValue;
