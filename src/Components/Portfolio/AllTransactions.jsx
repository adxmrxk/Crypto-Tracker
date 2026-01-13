import React, { useContext } from "react";
import { X } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";

const AllTransactions = ({ showAllTransactions, setShowAllTransactions }) => {
  const { user } = useContext(UserContext);

  const transactions = user?.transactions || [];

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
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleClose = () => setShowAllTransactions(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-[1300px] rounded-xl shadow-2xl ring-1 ring-amber-500/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            All Transactions
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {transactions.length === 0 ? (
            <div className="text-center text-gray-400 py-8 flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
                <span className="text-3xl grayscale opacity-60">🧾</span>
              </div>
              <p className="text-sm mb-1">No transactions yet</p>
              <p className="text-gray-500 text-xs">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-gradient-to-r from-slate-800/50 to-amber-900/20 rounded-lg text-sm font-semibold text-amber-200/80 border border-amber-500/10">
                <div className="pl-10">Coin</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Price</div>
                <div>Total Value</div>
                <div>Date</div>
              </div>

              {/* Transaction Rows */}
              <div className="max-h-[50vh] overflow-y-scroll pr-0 hover:pr-3 transition-all duration-300 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:transition-all [&::-webkit-scrollbar]:duration-300 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-thumb]:bg-slate-400/60 [&::-webkit-scrollbar-thumb]:rounded-full space-y-3">
                {transactions.map((transaction, index) => {
                  const currentPrice = getCoinPrice(transaction.coin);
                  const totalValue = currentPrice * transaction.amount;
                  const isBuy =
                    transaction.transactionType?.toLowerCase() === "buy";

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 px-4 py-3 bg-slate-800/30 rounded-lg items-center hover:bg-slate-600/50 transition-colors"
                    >
                      {/* Coin */}
                      <div className="flex items-center gap-2 min-w-0 ml-9">
                        <img
                          src={transaction.image}
                          alt={transaction.coin}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex flex-col items-start min-w-0">
                          <span
                            className="text-sm font-medium text-gray-100 leading-tight text-left w-full"
                            title={
                              transaction.coin[0].toUpperCase() +
                              transaction.coin.slice(1)
                            }
                          >
                            {transaction.coin[0].toUpperCase() +
                              transaction.coin.slice(1)}
                          </span>
                          <span className="text-xs text-amber-400/70">
                            {transaction.ticker?.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Type */}
                      <div>
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            isBuy
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {isBuy ? "BUY" : "SELL"}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="text-sm text-gray-200">
                        {transaction.amount}
                      </div>

                      {/* Price */}
                      <div className="text-sm text-gray-300">
                        {formatPrice(currentPrice)}
                      </div>

                      {/* Total Value */}
                      <div className="text-sm font-medium text-emerald-400">
                        {formatPrice(totalValue)}
                      </div>

                      {/* Date */}
                      <div className="text-sm text-gray-400">
                        {new Date(
                          transaction.dateOfTransaction
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-amber-500/20 p-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Total:{" "}
            <span className="text-amber-400 font-medium">
              {transactions.length}
            </span>{" "}
            transaction
            {transactions.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={handleClose}
            className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
