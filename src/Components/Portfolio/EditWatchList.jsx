import React, { useContext, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";
import axios from "axios";

const EditWatchList = ({ showEditModal, setShowEditModal }) => {
  const { user, setUser } = useContext(UserContext);
  const [editingCoin, setEditingCoin] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [amount, setAmount] = useState("");

  const watchList = user?.watchList || [];

  // Get unique coins from watchlist
  const watchListCoins = [...new Set(watchList.map((item) => item.coin))];
  const { data: coinPrices } = useCryptoCurrency(watchListCoins);

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

  const handleClose = () => {
    setShowEditModal(false);
    setEditingCoin(null);
    setTransactionType(null);
    setAmount("");
  };

  const handleEditClick = (coin, type) => {
    setEditingCoin(coin);
    setTransactionType(type);
    setAmount("");
  };

  const handleCancelEdit = () => {
    setEditingCoin(null);
    setTransactionType(null);
    setAmount("");
  };

  const handleConfirmTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    const numAmount = parseFloat(amount);

    // For sell, check if user has enough
    if (transactionType === "sell" && numAmount > editingCoin.amount) {
      alert("You cannot sell more than you own");
      return;
    }

    try {
      // Add the transaction
      const transactionResponse = await axios.patch(
        `http://localhost:5000/api/addTransaction/${user._id}`,
        {
          $addToSet: {
            transactions: {
              coin: editingCoin.coin,
              amount: numAmount,
              ticker: editingCoin.ticker,
              image: editingCoin.image,
              transactionType: transactionType,
            },
          },
        }
      );

      // Update watchlist amount
      const newAmount =
        transactionType === "buy"
          ? editingCoin.amount + numAmount
          : editingCoin.amount - numAmount;

      // If selling all, remove from watchlist; otherwise update amount
      if (newAmount <= 0) {
        const watchListResponse = await axios.patch(
          `http://localhost:5000/api/addWatchList/${user._id}`,
          {
            $pull: {
              watchList: { coin: editingCoin.coin },
            },
          }
        );
        setUser(watchListResponse.data);
      } else {
        // Update the amount in watchlist
        const updatedWatchList = user.watchList.map((item) =>
          item.coin === editingCoin.coin ? { ...item, amount: newAmount } : item
        );

        const watchListResponse = await axios.patch(
          `http://localhost:5000/api/addWatchList/${user._id}`,
          {
            $set: {
              watchList: updatedWatchList,
            },
          }
        );
        setUser(watchListResponse.data);
      }

      // Reset editing state
      handleCancelEdit();
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-[1300px] max-h-[85vh] rounded-xl shadow-2xl ring-1 ring-amber-500/20 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-400/60 [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Edit Watchlist
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {watchList.length === 0 ? (
            <div className="text-center text-gray-400 py-8 flex flex-col items-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
                <span className="text-3xl grayscale opacity-60">👀</span>
              </div>
              <p className="text-sm mb-1">No coins in your watchlist</p>
              <p className="text-gray-500 text-xs">
                Add coins to start tracking them
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-gradient-to-r from-slate-800/50 to-amber-900/20 rounded-lg text-sm font-semibold text-amber-200/80 border border-amber-500/10">
                <div className="pl-10">Coin</div>
                <div>Amount Owned</div>
                <div>Current Price</div>
                <div>Total Value</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              {/* Watchlist Rows */}
              <div className="space-y-3">
                {watchList.map((item, index) => {
                  const currentPrice = getCoinPrice(item.coin);
                  const totalValue = currentPrice * item.amount;
                  const isEditing = editingCoin?.coin === item.coin;

                  return (
                    <div key={index}>
                      <div
                        className={`grid grid-cols-6 gap-4 px-4 py-3 rounded-lg items-center transition-colors ${
                          isEditing
                            ? transactionType === "buy"
                              ? "bg-emerald-500/20 border border-emerald-500/30"
                              : "bg-red-500/20 border border-red-500/30"
                            : "bg-slate-800/30 hover:bg-slate-600/50"
                        }`}
                      >
                        {/* Coin */}
                        <div className="flex items-center gap-2 min-w-0 ml-9">
                          <img
                            src={item.image}
                            alt={item.coin}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                          <div className="flex flex-col items-start min-w-0">
                            <span
                              className="text-sm font-medium text-gray-100 leading-tight text-left w-full"
                              title={
                                item.coin[0].toUpperCase() + item.coin.slice(1)
                              }
                            >
                              {item.coin[0].toUpperCase() + item.coin.slice(1)}
                            </span>
                            <span className="text-xs text-amber-400/70">
                              {item.ticker?.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Amount Owned */}
                        <div className="text-sm text-gray-200">
                          {item.amount}
                        </div>

                        {/* Current Price */}
                        <div className="text-sm text-gray-300">
                          {formatPrice(currentPrice)}
                        </div>

                        {/* Total Value */}
                        <div className="text-sm font-medium text-emerald-400">
                          {formatPrice(totalValue)}
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-center gap-2">
                          {!isEditing ? (
                            <div className="relative">
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleEditClick(item, e.target.value);
                                  }
                                }}
                                defaultValue=""
                                className="appearance-none px-4 py-1.5 pr-8 bg-slate-700/60 text-gray-200 rounded-lg text-sm font-medium hover:bg-slate-600/60 transition-colors cursor-pointer border border-slate-500/50 outline-none"
                              >
                                <option value="" disabled>
                                  Select Action
                                </option>
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                              </select>
                              <ChevronDown
                                size={14}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                                  transactionType === "buy"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                }`}
                              >
                                {transactionType === "buy" ? "Buy" : "Sell"}
                              </span>
                              <input
                                type="number"
                                step="any"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount"
                                className={`w-24 px-2 py-1 rounded-lg text-sm text-white bg-slate-900/50 border outline-none ${
                                  transactionType === "buy"
                                    ? "border-emerald-500/50 focus:border-emerald-500"
                                    : "border-red-500/50 focus:border-red-500"
                                }`}
                              />
                              <button
                                onClick={handleConfirmTransaction}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                  transactionType === "buy"
                                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                    : "bg-red-500 text-white hover:bg-red-600"
                                }`}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1.5 bg-slate-600 text-gray-200 rounded-lg text-sm font-medium hover:bg-slate-500 transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Edit indicator */}
                      {isEditing && (
                        <div
                          className={`mt-1 px-4 py-2 rounded-lg text-xs ${
                            transactionType === "buy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {transactionType === "buy" ? (
                            <span>
                              Buying more {item.ticker?.toUpperCase()} - This
                              will be recorded as a BUY transaction
                            </span>
                          ) : (
                            <span>
                              Selling {item.ticker?.toUpperCase()} - This will
                              be recorded as a SELL transaction (Max:{" "}
                              {item.amount})
                            </span>
                          )}
                        </div>
                      )}
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
              {watchList.length}
            </span>{" "}
            coin
            {watchList.length !== 1 ? "s" : ""} in watchlist
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

export default EditWatchList;
