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
        <div className="relative">
          {/* Subtle glow effect behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>

          <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            {!hasCoins ? (
              /* Empty State - No coins in watchlist */
              <div className="w-[780px] h-[480px] flex flex-col items-center justify-center">
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
                <div className="flex flex-row justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-left text-gray-400 text-sm font-medium uppercase tracking-wide">Wallet Value</h1>
                      {isFetching && !isLoading && (
                        <span className="text-xs text-amber-400/80 animate-pulse">
                          Updating...
                        </span>
                      )}
                    </div>
                    <h2 className="text-left text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {isLoading ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : (
                        `$${totalWalletValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      )}
                    </h2>
                    {!isLoading && (
                      <div className={`flex items-center gap-1 mt-1 ${totalChange24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        <span className="text-sm font-medium">
                          {totalChange24h >= 0 ? "+" : ""}{changePercent.toFixed(2)}%
                        </span>
                        <span className="text-gray-500 text-sm">24h</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
                      {["1H", "24H", "7D", "1M", "3M"].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${
                            timeRange === range
                              ? "bg-slate-700/60 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
                              : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-700/50">
                  <WalletValueChart timeRange={timeRange} />
                </div>
              </>
            )}
          </div>
        </div>

        {hasCoins && (
          <div className="flex flex-row gap-4 pt-4">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/20 group-hover:to-orange-500/20 rounded-xl blur-sm transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-xl w-[180px] py-5 px-4 hover:border-amber-500/30 transition-all duration-300">
                <h1 className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Total Holdings</h1>
                <h2 className="text-xl font-bold text-gray-100">
                  {coins.length} <span className="text-sm font-normal text-gray-400">{coins.length === 1 ? "Coin" : "Coins"}</span>
                </h2>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/20 group-hover:to-orange-500/20 rounded-xl blur-sm transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-xl w-[180px] py-5 px-4 hover:border-amber-500/30 transition-all duration-300">
                <h1 className="text-xs text-gray-500 mb-2 uppercase tracking-wide">24h Change</h1>
                <h2
                  className={`text-xl font-bold ${
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
            </div>
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/20 group-hover:to-orange-500/20 rounded-xl blur-sm transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-xl w-[180px] py-5 px-4 hover:border-amber-500/30 transition-all duration-300">
                <h1 className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Best Performer</h1>
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
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
