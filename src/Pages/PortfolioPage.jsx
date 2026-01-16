import { React, useContext, useState, createContext } from "react";
import { UserContext } from "./SkeletonPage";
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from "react-dom/client";
import useCryptoCurrency from "../hooks/useCryptoCurrency";
import Tooltip from "@mui/material/Tooltip";
import DashBoard from "../Components/Portfolio/Dashboard";
import SearchCryptoSection from "../Components/SearchCryptoSection";
import CryptoChartSection from "../Components/CryptoChartSection";
import useHistoricalCryptoData from "../hooks/useHistoricCryptoData";
import LabelBottomNavigation from "../Components/LabelBottomNavigation";
import Analytics from "../Components/Portfolio/Analytics";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  //const { data } = useCryptoCurrency(user.watchList);

  return (
    <div className="">
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700">
        <Analytics></Analytics>
      </div>

      <div id="search-crypto" className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-radial from-slate-600 via-slate-700 to-slate-800">
        <SearchCryptoSection></SearchCryptoSection>
      </div>
      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default Dashboard;
