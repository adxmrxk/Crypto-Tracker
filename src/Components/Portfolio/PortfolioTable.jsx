import React from "react";

const PortfolioTable = () => {
  return (
    <div className="flex justify-center w-fit">
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-1 border-l-1 border-t-1 border-sky-300 font-semibold">
              Coin
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              Ticker
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              Price
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              1H
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              24H
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              7D
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              MRKT Cap
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1 border-sky-300 font-semibold">
              ATH
            </th>
            <th className="px-4 py-2 border-b-1 border-t-1  border-sky-300 font-semibold">
              VLME (24H)
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
          <tr className="border-b-1 border-l-1 border-sky-300">
            <td className="px-4 text-sm">Bitcoin</td>
            <td className="px-4 text-sm">BTC</td>
            <td className="px-4 text-sm">$42,000</td>
            <td className="px-4 text-sm">+2.7%</td>
            <td className="px-4 text-sm">-3.7%</td>
            <td className="px-4 text-sm">-10.3%</td>
            <td className="px-4 text-sm">$1,321,321</td>
            <td className="px-4 text-sm">$125,000</td>
            <td className="px-4 text-sm">$23,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
