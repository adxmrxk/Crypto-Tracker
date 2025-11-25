import React from "react";
import { Shield, TrendingUp, Activity, AlertCircle } from "lucide-react";

const PortfolioRiskSection = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-left text-lg font-semibold text-white mb-4">
          Portfolio Risk Score
        </h1>

        <div className="border-2 border-slate-600 rounded-xl p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white">7.2</div>
                <div className="text-xs text-slate-400 mt-0.5">out of 10</div>
              </div>
            </div>
            <div className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30">
              <span className="text-sm font-semibold text-amber-400">
                Moderate
              </span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500 w-[72%] rounded-full transition-all duration-700"></div>
          </div>
        </div>

        <div className="flex flex-row gap-3 mt-4">
          <div className="flex-1 px-4 py-3 rounded-lg bg-slate-800/40 border border-slate-600/40 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-slate-400 font-medium">Volatility</p>
            </div>
            <p className="text-lg font-bold text-white">32%</p>
          </div>

          <div className="flex-1 px-4 py-3 rounded-lg bg-slate-800/40 border border-slate-600/40 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-slate-400 font-medium">Diversity</p>
            </div>
            <p className="text-lg font-bold text-white">High</p>
          </div>

          <div className="flex-1 px-4 py-3 rounded-lg bg-slate-800/40 border border-slate-600/40 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <p className="text-xs text-slate-400 font-medium">Exposure</p>
            </div>
            <p className="text-lg font-bold text-white">Moderate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioRiskSection;
