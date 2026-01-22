import React, { useState, useContext, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Award,
  ChevronRight,
  Search,
  Star,
  Layers,
  Activity,
} from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";
import useCoinsOnce from "../../hooks/useCoinsOnce";
import { useNavigate } from "react-router-dom";
import TopWinners from "../Portfolio/TopWinners";
import NotificationBell from "../NotificationBell";

const HomePannel = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const coinNames = user?.watchList?.map((element) => element.coin) || [];
  const { data: userCoins, isLoading: userCoinsLoading } = useCryptoCurrency(coinNames);
  const { data: allCoins, isLoading: allCoinsLoading } = useCoinsOnce();

  // Calculate portfolio value
  const totalPortfolioValue = userCoins?.reduce((total, coin) => {
    const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
    if (userCoin) {
      return total + userCoin.amount * coin.current_price;
    }
    return total;
  }, 0) || 0;

  // Calculate 24h change
  const totalChange24h = userCoins?.reduce((total, coin) => {
    const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
    if (userCoin) {
      const coinValue = userCoin.amount * coin.current_price;
      const changePercent = coin.price_change_percentage_24h || 0;
      return total + (coinValue * changePercent) / 100;
    }
    return total;
  }, 0) || 0;

  const changePercent = totalPortfolioValue > 0
    ? (totalChange24h / (totalPortfolioValue - totalChange24h)) * 100
    : 0;

  // Get top 10 coins by market cap
  const topCoins = allCoins?.slice(0, 10) || [];

  // Price ticker animation
  const [tickerOffset, setTickerOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(prev => prev - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const tickerCoins = allCoins?.slice(0, 20) || [];

  // Format large numbers
  const formatMarketCap = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num?.toLocaleString()}`;
  };

  return (
    <div className="w-full min-h-screen pb-24">
      {/* Live Price Ticker */}
      <div className="bg-slate-900/80 border-b border-slate-700/50 overflow-hidden py-2.5">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ transform: `translateX(${tickerOffset}px)` }}
        >
          {[...tickerCoins, ...tickerCoins].map((coin, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <img src={coin.image} alt={coin.name} className="w-4 h-4 rounded-full" />
              <span className="text-gray-400">{coin.symbol?.toUpperCase()}</span>
              <span className="text-gray-200 font-medium">
                ${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-xs ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.username || 'Trader'}
            </h1>
            <p className="text-gray-400">Track your investments and explore the crypto market</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-2 px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-300 hover:bg-slate-700 hover:border-slate-600 transition-all"
            >
              <Search className="w-4 h-4" />
              Search coins...
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {/* Portfolio Value */}
          <div className="col-span-2 bg-gradient-to-br from-amber-500/10 via-slate-800 to-slate-900 rounded-2xl border border-amber-500/20 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Wallet className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-gray-400 font-medium">Portfolio Value</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {userCoinsLoading ? '...' : `$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </h2>
                <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-semibold ${
                  totalChange24h >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {totalChange24h >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {totalChange24h >= 0 ? '+' : ''}{changePercent.toFixed(2)}% today
                </div>
              </div>
              <button
                onClick={() => navigate('/portfolio')}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Holdings */}
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-400 font-medium">Holdings</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">{user?.watchList?.length || 0}</h2>
            <p className="text-gray-500 text-sm">Assets in portfolio</p>
          </div>

          {/* Best Performer */}
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-gray-400 font-medium">Top Performer</span>
            </div>
            {userCoins?.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {userCoins.reduce((best, coin) =>
                    (coin.price_change_percentage_24h || 0) > (best.price_change_percentage_24h || 0) ? coin : best
                  , userCoins[0])?.symbol?.toUpperCase()}
                </h2>
                <p className="text-emerald-400 text-sm font-medium">
                  +{Math.max(...userCoins.map(c => c.price_change_percentage_24h || 0)).toFixed(2)}%
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-600 mb-1">-</h2>
                <p className="text-gray-500 text-sm">Add coins to track</p>
              </>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Market Overview */}
          <div className="col-span-2 space-y-6">
            {/* Top Cryptocurrencies */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Top Cryptocurrencies
                </h3>
                <button
                  onClick={() => navigate('/explore')}
                  className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-700/50">
                {topCoins.map((coin, idx) => (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 font-medium w-6">{idx + 1}</span>
                      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="text-white font-semibold">{coin.name}</h4>
                        <p className="text-gray-500 text-sm">{coin.symbol?.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          ${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-gray-500 text-sm">{formatMarketCap(coin.market_cap)}</p>
                      </div>

                      <div className={`w-24 text-right px-3 py-1.5 rounded-lg font-semibold text-sm ${
                        coin.price_change_percentage_24h >= 0
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Performers */}
            <TopWinners />

            {/* Your Watchlist Quick View */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  Your Watchlist
                </h3>
                <button
                  onClick={() => navigate('/portfolio')}
                  className="text-sm text-amber-400 hover:text-amber-300 font-medium"
                >
                  View All
                </button>
              </div>

              {userCoins?.length > 0 ? (
                <div className="space-y-3">
                  {userCoins.slice(0, 4).map((coin) => {
                    const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
                    const holdingValue = userCoin ? userCoin.amount * coin.current_price : 0;

                    return (
                      <div
                        key={coin.id}
                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full" />
                          <div>
                            <h4 className="text-white font-medium text-sm">{coin.symbol?.toUpperCase()}</h4>
                            <p className="text-gray-500 text-xs">{userCoin?.amount} held</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold text-sm">
                            ${holdingValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </p>
                          <p className={`text-xs font-medium ${
                            coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-3">No coins in your watchlist</p>
                  <button
                    onClick={() => navigate('/explore')}
                    className="text-amber-400 text-sm font-medium hover:text-amber-300"
                  >
                    Add your first coin →
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action */}
            <div
              onClick={() => navigate('/explore')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 cursor-pointer hover:from-amber-400 hover:to-orange-400 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">Explore Market</h3>
                  <p className="text-slate-800 text-sm">Discover and track new coins</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-6 h-6 text-slate-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePannel;
