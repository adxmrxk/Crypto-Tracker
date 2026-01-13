import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";

const RiskAndActivity = ({ onViewAllClick }) => {
  const { user } = useContext(UserContext);

  const transactions = user?.transactions || [];
  const hasTransactions = transactions.length > 0;

  // Get unique coins from transactions
  const transactionCoins = [...new Set(transactions.map((t) => t.coin))];
  const { data: coinPrices } = useCryptoCurrency(transactionCoins);

  // Helper to get current price for a coin
  const getCoinPrice = (coinId) => {
    const coin = coinPrices?.find((c) => c.id === coinId);
    return coin?.current_price || 0;
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "$0.00";
    if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(4)}`;
  };

  // EMPTY STATE
  if (!hasTransactions) {
    return (
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 h-[500px] flex flex-col items-center justify-center text-gray-400 rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-gray-200">Transactions</h1>
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
          <span className="text-3xl grayscale opacity-60">💸</span>
        </div>
        <p className="text-sm text-center mb-1">No transactions yet</p>
        <p className="text-gray-500 text-xs">Your buy/sell history will appear here</p>
      </div>
    );
  }

  // NORMAL STATE
  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 h-[500px] flex flex-col rounded-lg">
      <div className="mt-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-3">
          <h1 className="text-left text-lg font-semibold text-gray-200">
            Transactions
          </h1>
          <button
            onClick={onViewAllClick}
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-2 overflow-hidden">
          {transactions.slice(0, 9).map((element, index) => {
            const currentPrice = getCoinPrice(element.coin);
            const totalValue = currentPrice * element.amount;
            const isBuy = element.transactionType?.toLowerCase() === "buy";

            return (
              <div
                key={index}
                className="group relative rounded-md bg-gradient-to-br from-gray-800/60 via-gray-800/70 to-gray-800/80 p-2 transition-all duration-300 hover:shadow-lg hover:from-slate-700 hover:to-slate-600 hover:scale-105 cursor-pointer border border-slate-600"
              >
                <div className="flex flex-row items-center gap-1 mb-2">
                  <img
                    src={element.image}
                    className="w-[24px] h-[24px] rounded-full"
                    alt={element.coin}
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h1 className="text-sm font-semibold bg-gradient-to-br from-sky-100 to-sky-200 bg-clip-text text-transparent truncate text-left">
                      {element.coin[0].toUpperCase() + element.coin.slice(1)}
                    </h1>
                    <h2 className="text-[10px] text-slate-300 text-left">
                      {new Date(element.dateOfTransaction).toLocaleDateString()}
                    </h2>
                  </div>
                </div>

                <div className="text-left pl-1">
                  <div className="flex items-center gap-1">
                    <span className={`text-[8px] px-1 py-0.5 rounded ${isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {isBuy ? 'BUY' : 'SELL'}
                    </span>
                    <span className="text-xs font-semibold text-amber-200">
                      {element.ticker?.toUpperCase()}
                    </span>
                  </div>
                  <h1 className="text-xs text-emerald-300/80 mt-1">
                    {formatPrice(totalValue)}
                  </h1>
                  <h1 className="text-[10px] text-gray-400">
                    {element.amount} @ {formatPrice(currentPrice)}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        {transactions.length > 9 && (
          <p className="text-center text-xs text-gray-400 mt-2">
            +{transactions.length - 9} more transactions
          </p>
        )}
      </div>
    </div>
  );
};

export default RiskAndActivity;
