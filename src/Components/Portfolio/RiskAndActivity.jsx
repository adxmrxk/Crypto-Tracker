import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import { Shield, TrendingUp, TrendingDown } from "lucide-react";
import PortfolioRiskSection from "./PortfolioRiskSection";

const RiskAndActivity = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 h-[500px]">
      {/* Transactions Section */}
      <div className="mt-7">
        <div className="flex flex-row justify-between">
          <h1 className="text-left mb-2 text-lg font-semibold text-gray-200">
            Transactions
          </h1>
          <h1 className="text-lg font-semibold text-gray-200">View All</h1>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-3">
          {user?.transactions?.slice(0, 9).map((element, index) => {
            return (
              <div
                key={index}
                className="group relative rounded-md bg-gradient-to-br from-gray-800/60 via-gray-800/70 to-gray-800/80 p-2 transition-all duration-300 hover:shadow-lg hover:from-slate-700 hover:to-slate-600 hover:scale-105 cursor-pointer border border-slate-600"
              >
                <div className="flex flex-row items-center gap-1 mb-3">
                  <img
                    src={element.image}
                    className="w-[29px] h-[29px] rounded-full"
                    alt={element.coin}
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h1 className="text-sm font-semibold bg-gradient-to-br from-sky-100 to-sky-200 bg-clip-text text-transparent truncate text-left">
                      {element.coin[0].toUpperCase() +
                        element.coin.slice(1, element.coin.length)}
                    </h1>
                    <h2 className="text-xs text-slate-200 text-left -mt-0.5">
                      {element.dateOfTransaction.slice(0, 10)}
                    </h2>
                  </div>
                </div>
                <div className="text-left pl-1">
                  <h1 className="text-sm font-semibold text-amber-200">
                    {element.ticker.toUpperCase()}
                  </h1>
                  <h1 className="text-sm -mt-0.5 text-emerald-300/80">
                    $242.00
                  </h1>
                  <h1 className="text-sm text-gray-100 -mt-0.5">
                    {element.amount}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RiskAndActivity;
