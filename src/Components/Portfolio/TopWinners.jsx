import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import useCryptoCurrency from "../../hooks/useCryptoCurrency";
import { TrendingUp, Trophy } from "lucide-react";

const TopWinners = () => {
  const { user } = useContext(UserContext);
  const [sortedData, setSortedData] = useState([]);

  const coinNames = user?.watchList?.map((element) => element.coin) || [];
  const { data } = useCryptoCurrency(coinNames);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const sorted = [...data].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      setSortedData(sorted);
    }
  }, [data]);

  const WinnerCard = ({ rank, coin }) => {
    if (!coin) return null;

    const previousPrice =
      coin.current_price / (1 + coin.price_change_percentage_24h / 100);
    const changePercent = coin.price_change_percentage_24h;
    const isPositive = changePercent >= 0;

    const rankStyles = {
      1: {
        gradient: "from-yellow-400 to-yellow-600",
        glow: "bg-yellow-500/30",
        border: "border-yellow-500/30 hover:border-yellow-500/50",
      },
      2: {
        gradient: "from-gray-300 to-gray-500",
        glow: "bg-gray-400/30",
        border: "border-slate-600 hover:border-slate-500",
      },
      3: {
        gradient: "from-amber-600 to-amber-800",
        glow: "bg-amber-600/30",
        border: "border-amber-700/30 hover:border-amber-600/50",
      },
    };

    const style = rankStyles[rank] || rankStyles[3];

    return (
      <div className={`group relative rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-4 transition-all duration-300 hover:from-slate-800 hover:to-slate-900 cursor-pointer border ${style.border}`}>
        <div className="flex items-center gap-4">
          {/* Rank Badge */}
          <div className="relative flex-shrink-0">
            <div className={`absolute inset-0 rounded-full ${style.glow} blur-lg opacity-60`}></div>
            <div className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center font-black text-base text-slate-900 shadow-lg`}>
              {rank}
            </div>
          </div>

          {/* Coin Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
              />
              <h3 className="font-semibold text-gray-100 truncate">{coin.name}</h3>
              <span className="text-gray-500 text-sm">{coin.symbol?.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-100">
                  ${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-gray-500">
                  from ${previousPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-sm ${
                  isPositive
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                <TrendingUp
                  size={14}
                  className={isPositive ? "" : "rotate-180"}
                />
                {isPositive ? "+" : ""}{changePercent?.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 border border-slate-700">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-amber-500/20 rounded-lg">
          <Trophy className="w-5 h-5 text-amber-400" />
        </div>
        <h2 className="text-lg font-bold text-gray-100">Top Performers</h2>
      </div>

      {sortedData.length > 0 ? (
        <div className="space-y-3">
          {sortedData.slice(0, 3).map((coin, index) => (
            <WinnerCard key={coin.id} rank={index + 1} coin={coin} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Trophy className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Add coins to your watchlist</p>
          <p className="text-gray-500 text-xs mt-1">to see your top performers</p>
        </div>
      )}
    </div>
  );
};

export default TopWinners;
