import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

const PortfolioTable = ({ cryptoData, isLoading, isFetching }) => {
  const { user } = useContext(UserContext);

  const coins = user?.watchList?.map((coin) => coin.coin) || [];
  const data = cryptoData;

  // Format large numbers (market cap)
  const formatMarketCap = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num?.toLocaleString() || 0}`;
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "$0.00";
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format percentage with color
  const formatPercent = (percent) => {
    if (percent === null || percent === undefined) return <span className="text-gray-400">-</span>;
    const isPositive = percent >= 0;
    return (
      <span className={isPositive ? "text-emerald-400" : "text-red-400"}>
        {isPositive ? "+" : ""}{percent.toFixed(2)}%
      </span>
    );
  };

  if (coins.length === 0) {
    return (
      <div className="w-[800px] h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-gray-200">
          Wallet Breakdown
        </h1>
        <p className="text-sm">No assets in portfolio</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-[800px] h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-gray-200">
          Wallet Breakdown
        </h1>
        <p className="text-sm">Loading...</p>
      </div>
    );
  }

  // Merge API data with user's watchlist data
  const tableData = data?.map((coin) => {
    const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
    return {
      ...coin,
      amount: userCoin?.amount || 0,
      userImage: userCoin?.image,
    };
  }) || [];

  return (
    <div className="w-[800px] h-[400px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-left text-xl font-bold text-gray-200">
          Wallet Breakdown
        </h1>
        {isFetching && !isLoading && (
          <span className="text-xs text-blue-400 animate-pulse">Updating...</span>
        )}
      </div>

      {/* Header */}
      <div className="grid grid-cols-7 border-t border-l border-r border-b border-slate-600 bg-slate-800/50 rounded-t-md">
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          Coin
        </div>
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          Price
        </div>
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          1H
        </div>
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          24H
        </div>
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          7D
        </div>
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          ATH
        </div>
        <div className="px-2 py-2 font-semibold text-blue-100 text-sm">
          MKT Cap
        </div>
      </div>

      {/* Table Body */}
      <div className="max-h-[280px] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tableData.map((coin, index) => (
          <div
            key={index}
            className="grid grid-cols-7 border-l border-r border-b border-slate-600 items-center hover:bg-slate-700/30 transition-colors"
          >
            <div className="px-2 py-3 text-sm flex flex-row gap-2 items-center min-w-0">
              <img
                src={coin.image}
                className="w-[24px] h-[24px] rounded-full flex-shrink-0"
                alt={coin.name}
              />
              <span className="text-gray-100 truncate" title={coin.name}>
                {coin.name}
              </span>
            </div>
            <div className="px-2 py-3 text-sm text-gray-100">
              {formatPrice(coin.current_price)}
            </div>
            <div className="px-2 py-3 text-sm">
              {formatPercent(coin.price_change_percentage_1h_in_currency)}
            </div>
            <div className="px-2 py-3 text-sm">
              {formatPercent(coin.price_change_percentage_24h)}
            </div>
            <div className="px-2 py-3 text-sm">
              {formatPercent(coin.price_change_percentage_7d_in_currency)}
            </div>
            <div className="px-2 py-3 text-sm text-gray-100">
              {formatPrice(coin.ath)}
            </div>
            <div className="px-2 py-3 text-sm text-gray-300">
              {formatMarketCap(coin.market_cap)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTable;
