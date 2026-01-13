import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

const WatchList = ({ coin, setCoin, coinClicked, setCoinClicked }) => {
  const { user } = useContext(UserContext);

  const handleClick = (element) => {
    console.log("Watch List Handle Click");
    setCoin(element);
    setCoinClicked(true);
  };

  if (!user?.watchList?.length) {
    return (
      <div className="w-[1280px] h-[180px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-lg mt-5 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4 text-gray-200">Watchlist</h1>
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-800/60 flex items-center justify-center">
          <span className="text-3xl grayscale opacity-60">👀</span>
        </div>
        <p className="text-sm text-gray-400 mb-1">No coins in your watchlist yet</p>
        <p className="text-gray-500 text-xs">Add coins to start tracking them</p>
      </div>
    );
  }

  return (
    <div className="w-[1280px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-lg mt-5 p-4">
      <h1 className="text-xl font-bold text-gray-200 mb-4">Watchlist</h1>
      <div className="flex flex-row flex-wrap gap-3">
        {user.watchList.map((element, index) => (
          <div
            key={index}
            onClick={() => handleClick(element)}
            className="flex items-center gap-3 px-5 py-3 min-w-[120px] bg-slate-800/60 border border-slate-600 rounded-lg hover:border-amber-500/50 hover:bg-slate-700/60 transition-all duration-200 cursor-pointer"
          >
            <img
              src={element.image}
              alt={element.ticker}
              className="w-8 h-8 min-w-[32px] rounded-full"
            />
            <span className="font-semibold text-lg text-gray-100">
              <h1 className={element?.ticker === "eth" ? "-ml-3 pr-3" : ""}>
                {element.ticker.trim().toUpperCase()}
              </h1>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
