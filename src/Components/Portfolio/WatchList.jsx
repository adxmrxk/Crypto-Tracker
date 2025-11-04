import React, { useContext } from 'react';
import { UserContext } from '../../Pages/SkeletonPage';

const WatchList = ({ coin, setCoin, coinClicked, setCoinClicked }) => {
  const { user } = useContext(UserContext);

  const handleClick = (element) => {
    console.log('Watch List Handle Click');
    setCoin(element);
    setCoinClicked(true);
  };

  return (
    <div className="flex flex-row flex-wrap max-w-[600px] h-fit py-4 pl-3 pr-2 mt-2 overflow-y-auto bg-slate-900/60 backdrop-blur-md rounded-xl shadow-lg shadow-slate-950/40 border border-slate-700">
      {user?.watchList?.length ? (
        user.watchList.map((element, index) => (
          <div
            key={index}
            onClick={() => handleClick(element)}
            className="
              flex items-center justify-center
              m-2 px-5 py-3
              bg-gradient-to-br from-indigo-500/20 to-indigo-300/10
              border border-indigo-400/30
              rounded-lg
              hover:from-indigo-500/40 hover:to-indigo-300/30 hover:border-indigo-300/60
              hover:shadow-md hover:shadow-indigo-500/20
              transition-all duration-200 ease-out
              cursor-pointer select-none
            "
          >
            <h1 className="font-roboto text-lg font-semibold text-slate-100 tracking-wide">
              {element.ticker.toUpperCase()}
            </h1>
          </div>
        ))
      ) : (
        <div className="w-full text-center text-slate-400 italic py-4">
          No coins in your watchlist yet.
        </div>
      )}
    </div>
  );
};

export default WatchList;
