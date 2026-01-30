import React, { useContext, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Award,
  ChevronRight,
  Search,
  Star,
  Layers,
  Zap,
  BarChart3,
  Compass,
  Sparkles,
  MessageCircle,
  PenSquare,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";
import useCoinsOnce from "../../hooks/useCoinsOnce";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../NotificationBell";
import CreatePostModal from "./CreatePostModal";
import BuyCoinModal from "./BuyCoinModal";
import SearchModal from "./SearchModal";

// Mini sparkline component for visual flair
const MiniSparkline = ({ trend, color }) => {
  const points = trend >= 0
    ? "0,12 4,10 8,11 12,8 16,9 20,6 24,7 28,4 32,5 36,2"
    : "0,2 4,4 8,3 12,6 16,5 20,8 24,7 28,10 32,9 36,12";

  return (
    <svg width="40" height="14" viewBox="0 0 40 14" className="opacity-60">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const HomePannel = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const coinNames = user?.watchList?.map((element) => element.coin) || [];
  const { data: userCoins, isLoading: userCoinsLoading } = useCryptoCurrency(coinNames);
  const { data: allCoins, isLoading: allCoinsLoading } = useCoinsOnce();

  // Modal states
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showBuyCoin, setShowBuyCoin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  // Get top gainers and losers
  const sortedByChange = [...(allCoins || [])].sort(
    (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
  );
  const topGainers = sortedByChange.slice(0, 4);
  const topLosers = sortedByChange.slice(-4).reverse();

  // Get top coins by market cap for trending
  const trendingCoins = allCoins?.slice(0, 5) || [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="w-full min-h-screen pb-24 bg-gradient-to-br from-[#1e293b] via-[#152033] to-[#0f172a] overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <p className="text-amber-400/80 text-sm font-medium">{getGreeting()}</p>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              {user?.displayName || 'Trader'}
            </h1>
          </div>
          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <button
              onClick={() => setShowCreatePost(true)}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-amber-500/20 transition-all duration-300 cursor-pointer"
              title="Create Post"
            >
              <PenSquare className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" />
            </button>
            <button
              onClick={() => setShowBuyCoin(true)}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-emerald-500/20 transition-all duration-300 cursor-pointer"
              title="Buy Crypto"
            >
              <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </button>
            <button
              onClick={() => setShowSearch(true)}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-blue-500/20 transition-all duration-300 cursor-pointer"
              title="Search"
            >
              <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </button>
            <NotificationBell />
          </div>
        </div>

        {/* Hero Portfolio Card */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 rounded-[32px] blur-xl" />
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 p-8 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <div className="flex justify-start mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
                    <Wallet className="w-4 h-4 text-amber-400" />
                    <span className="text-gray-300 text-sm font-medium">Portfolio Value</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-5xl font-bold text-white mb-2 tracking-tight text-left">
                    {userCoinsLoading ? (
                      <span className="inline-block w-48 h-12 bg-white/10 rounded-lg animate-pulse" />
                    ) : (
                      `$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                  </h2>
                  <div className="flex justify-start">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                      totalChange24h >= 0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {totalChange24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{totalChange24h >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</span>
                      <span className="text-white/50">24h</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => navigate('/PortfolioPage')}
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]"
                  >
                    View Portfolio
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate('/explore')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/10 hover:border-white/20"
                  >
                    <Compass className="w-4 h-4" />
                    Explore
                  </button>
                </div>
              </div>

              {/* Stats side panel */}
              <div className="hidden lg:flex flex-col gap-3 ml-8">
                <div className="flex items-center gap-4 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="p-2.5 bg-purple-500/20 rounded-xl">
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium mb-0.5">Holdings</p>
                    <p className="text-xl font-bold text-white">{user?.watchList?.length || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="p-2.5 bg-emerald-500/20 rounded-xl">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium mb-0.5">Best Performer</p>
                    <p className="text-xl font-bold text-white">
                      {userCoins?.length > 0 ? userCoins.reduce((best, coin) =>
                        (coin.price_change_percentage_24h || 0) > (best.price_change_percentage_24h || 0) ? coin : best
                      , userCoins[0])?.symbol?.toUpperCase() : '-'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="p-2.5 bg-blue-500/20 rounded-xl">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium mb-0.5">Market Status</p>
                    <p className="text-xl font-bold text-emerald-400">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats - only visible on smaller screens */}
        <div className="grid grid-cols-3 gap-3 mb-6 lg:hidden">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 text-center">
            <Layers className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{user?.watchList?.length || 0}</p>
            <p className="text-gray-500 text-xs">Holdings</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 text-center">
            <Award className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {userCoins?.length > 0 ? userCoins.reduce((best, coin) =>
                (coin.price_change_percentage_24h || 0) > (best.price_change_percentage_24h || 0) ? coin : best
              , userCoins[0])?.symbol?.toUpperCase() : '-'}
            </p>
            <p className="text-gray-500 text-xs">Top</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 text-center">
            <BarChart3 className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-400">Live</p>
            <p className="text-gray-500 text-xs">Market</p>
          </div>
        </div>

        {/* Your Holdings - Full Width */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="p-1.5 bg-amber-500/20 rounded-lg">
                <Star className="w-4 h-4 text-amber-400" />
              </div>
              Your Holdings
            </h3>
            <button
              onClick={() => navigate('/PortfolioPage')}
              className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group"
            >
              View all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {userCoins?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {userCoins.slice(0, 6).map((coin, idx) => {
                const userCoin = user?.watchList?.find((item) => item.coin === coin.id);
                const holdingValue = userCoin ? userCoin.amount * coin.current_price : 0;
                const isPositive = coin.price_change_percentage_24h >= 0;

                return (
                  <div
                    key={coin.id}
                    onClick={() => navigate(`/explore/${coin.id}`)}
                    className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-xl" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-400 border border-white/10">
                          {idx + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">{coin.symbol?.toUpperCase()}</p>
                        <p className="text-gray-500 text-xs">{userCoin?.amount} coins</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold text-sm">
                        ${holdingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7 text-amber-400" />
              </div>
              <p className="text-white font-medium mb-1">No holdings yet</p>
              <p className="text-gray-500 text-sm mb-3">Start tracking your favorite coins</p>
              <button
                onClick={() => navigate('/explore')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-colors text-sm"
              >
                <Compass className="w-4 h-4" />
                Explore Coins
              </button>
            </div>
          )}
        </div>

        {/* Market Cards Row - Trending, Top Gainers, Top Losers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Trending */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/20 rounded-lg">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                Trending
              </h3>
              <button
                onClick={() => navigate('/explore')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                See all
              </button>
            </div>
            <div className="space-y-2">
              {trendingCoins.slice(0, 4).map((coin, idx) => (
                <div
                  key={coin.id}
                  onClick={() => navigate(`/explore/${coin.id}`)}
                  className="group flex items-center justify-between p-2.5 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-gray-600 text-xs font-bold w-3">{idx + 1}</span>
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-lg" />
                    <div>
                      <p className="text-white font-medium text-sm group-hover:text-amber-400 transition-colors">{coin.symbol?.toUpperCase()}</p>
                      <p className="text-gray-600 text-xs">${coin.current_price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Gainers */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-5">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              Top Gainers
            </h3>
            <div className="space-y-2">
              {topGainers.slice(0, 4).map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => navigate(`/explore/${coin.id}`)}
                  className="flex items-center justify-between p-2.5 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl transition-all cursor-pointer border border-emerald-500/10"
                >
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-lg" />
                    <span className="text-white text-sm font-medium">{coin.symbol?.toUpperCase()}</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold">+{coin.price_change_percentage_24h?.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-5">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-red-500/20 rounded-lg">
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
              Top Losers
            </h3>
            <div className="space-y-2">
              {topLosers.slice(0, 4).map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => navigate(`/explore/${coin.id}`)}
                  className="flex items-center justify-between p-2.5 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer border border-red-500/10"
                >
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-lg" />
                    <span className="text-white text-sm font-medium">{coin.symbol?.toUpperCase()}</span>
                  </div>
                  <span className="text-red-400 text-xs font-bold">{coin.price_change_percentage_24h?.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/explore')}
            className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl translate-x-10 -translate-y-10" />
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-slate-900 font-bold text-xl mb-1">Explore Market</h3>
                <p className="text-slate-800/80">Discover trending coins</p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all">
                <Compass className="w-6 h-6 text-slate-900" />
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate('/chatroom')}
            className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl translate-x-10 -translate-y-10" />
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-xl mb-1 text-left">Start a Discussion</h3>
                <p className="text-white/70 text-left">Share your thoughts with the community</p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
      {showBuyCoin && (
        <BuyCoinModal onClose={() => setShowBuyCoin(false)} />
      )}
      {showSearch && (
        <SearchModal onClose={() => setShowSearch(false)} />
      )}
    </div>
  );
};

export default HomePannel;
