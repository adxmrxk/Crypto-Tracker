import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Search, Check, TrendingUp, TrendingDown } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCoinsOnce from "../../hooks/useCoinsOnce";
import axios from "axios";

const BuyCoinModal = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const { data: coinsList } = useCoinsOnce();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0 && coinsList) {
      const filtered = coinsList.filter(coin =>
        coin.name.toLowerCase().includes(value.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle selecting a coin
  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle purchase
  const handlePurchase = async () => {
    if (!selectedCoin || !amount || purchasing) return;

    setPurchasing(true);
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/addWatchList/${user._id}`,
        {
          $addToSet: {
            watchList: {
              coin: selectedCoin.id,
              amount: parseFloat(amount),
              ticker: String(selectedCoin.symbol),
              image: selectedCoin.image,
            },
          },
        }
      );

      const response2 = await axios.patch(
        `http://localhost:5000/api/addTransaction/${user._id}`,
        {
          $addToSet: {
            transactions: {
              coin: selectedCoin.id,
              amount: parseFloat(amount),
              ticker: String(selectedCoin.symbol),
              image: selectedCoin.image,
              transactionType: "buy",
            },
          },
        }
      );

      setUser(response2.data);
      setPurchaseSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to purchase:", err);
    } finally {
      setPurchasing(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalValue = selectedCoin && amount
    ? (parseFloat(amount) * selectedCoin.current_price).toFixed(2)
    : "0.00";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4 backdrop-blur-sm bg-black/60">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-700 p-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Buy Crypto</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Success State */}
        {purchaseSuccess ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Purchase Complete!</h2>
            <p className="text-gray-400">
              You've added {amount} {selectedCoin?.symbol?.toUpperCase()} to your portfolio.
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a cryptocurrency..."
                value={inputValue}
                onChange={handleChange}
                onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
                className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none placeholder-gray-400"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto"
                >
                  {suggestions.map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => handleSelectCoin(coin)}
                      className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-gray-100 transition-colors border-b border-slate-700 last:border-b-0 flex items-center gap-3"
                    >
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div className="flex-1">
                        <span className="font-medium">{coin.name}</span>
                        <span className="text-gray-400 text-sm ml-2">{coin.symbol.toUpperCase()}</span>
                      </div>
                      <span className="text-gray-300">${coin.current_price?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {showSuggestions && inputValue.length > 0 && suggestions.length === 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="px-4 py-4 text-center">
                    <p className="text-gray-400 text-sm">No coins found matching "{inputValue}"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Coin Card */}
            {selectedCoin ? (
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-700/30 border border-slate-600 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedCoin.name}</h3>
                      <p className="text-gray-400 text-sm">{selectedCoin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCoin(null)}
                    className="p-1.5 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-gray-500 text-xs mb-1">Current Price</p>
                    <p className="text-white font-semibold">
                      ${selectedCoin.current_price?.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-gray-500 text-xs mb-1">24h Change</p>
                    <p className={`font-semibold flex items-center gap-1 ${
                      selectedCoin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {selectedCoin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {selectedCoin.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">Amount to buy</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="Enter amount..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-800/50 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none placeholder-gray-500"
                  />
                </div>

                {/* Total Value */}
                <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Total Value</p>
                    <p className="text-xl font-bold text-white">${Number(totalValue).toLocaleString()}</p>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handlePurchase}
                  disabled={!amount || purchasing}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all cursor-pointer"
                >
                  {purchasing ? "Processing..." : `Buy ${selectedCoin.symbol.toUpperCase()}`}
                </button>
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-7 h-7 text-gray-500" />
                </div>
                <p className="text-gray-400 mb-1">Search for a cryptocurrency</p>
                <p className="text-gray-500 text-sm">Select a coin to add to your portfolio</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCoinModal;
