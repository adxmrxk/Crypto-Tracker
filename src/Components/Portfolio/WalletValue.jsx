import React from "react";
import { useState } from "react";
import WalletValueChart from "./WalletValueChart";
import RiskAndActivity from "./RiskAndActivity";

const WalletValue = () => {
  const [borderColour, setBorderColour] = useState("1H");
  const [timeRange, setTimeRange] = useState("1H");

  return (
    <div className="flex flex-row justify-between w-[1280px] mx-auto">
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-left ml-2">Wallet Value</h1>
            <h2 className="text-left text-2xl font-semibold ml-2">$34,212</h2>
          </div>
          <div className="flex items-center">
            <ul className="flex flex-row gap-3">
              <li
                className={`border  ${
                  timeRange === "1H" ? "border-yellow-400" : "border-gray-700"
                }  px-4 rounded-md ${
                  timeRange !== "1H"
                    ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setTimeRange("1H");
                }}
              >
                1H
              </li>
              <li
                className={`border  ${
                  timeRange === "24H" ? "border-yellow-400" : "border-gray-700"
                }  px-4 rounded-md  ${
                  timeRange !== "24H"
                    ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setTimeRange("24H");
                }}
              >
                24H
              </li>
              <li
                className={`border  ${
                  timeRange === "7D" ? "border-yellow-400" : "border-gray-700"
                }  px-4 rounded-md ${
                  timeRange !== "7D"
                    ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setTimeRange("7D");
                }}
              >
                7D
              </li>
              <li
                className={`border  ${
                  timeRange === "1M" ? "border-yellow-400" : "border-gray-700"
                }  px-4 rounded-md ${
                  timeRange !== "1M"
                    ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setTimeRange("1M");
                }}
              >
                1M
              </li>
              <li
                className={`border ${
                  timeRange === "3M" ? "border-yellow-400" : "border-gray-700"
                }  px-4 rounded-md ${
                  timeRange !== "3M"
                    ? "hover:border-yellow-300 duration-250 transition-all cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setTimeRange("3M");
                }}
              >
                3MD
              </li>
            </ul>
          </div>
        </div>
        <WalletValueChart></WalletValueChart>
        <div className="flex flex-row gap-3 pt-3">
          <div className="border-3 border-black w-[150px] py-5">
            <h1 className="text-sm">Life Time Earnings</h1>
          </div>
          <div className="border-3 border-black w-[150px] flex items-center justify-center">
            <h1 className="text-sm">Changes Since Last Logged In</h1>
          </div>
          <div className="border-3 border-black w-[150px] flex items-center justify-center">
            <h1 className="text-sm">Unrealized Gains</h1>
          </div>
        </div>
      </div>
      <div className="border-2 border-purple-400 w-[420px]">
        <RiskAndActivity></RiskAndActivity>
      </div>
    </div>
  );
};

export default WalletValue;
