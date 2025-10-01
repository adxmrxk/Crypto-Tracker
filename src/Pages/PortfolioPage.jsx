import {React, useContext, useState, createContext} from 'react'
import { UserContext } from './SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import DashBoard from '../Components/Portfolio/Dashboard';
import AddWatchList from '../Components/AddWatchList';
import SearchCryptoSection from '../Components/SearchCryptoSection';
import CryptoChartSection from '../Components/CryptoChartSection';
import useHistoricalCryptoData from '../hooks/useHistoricCryptoData';
import LabelBottomNavigation from '../Components/LabelBottomNavigation';





export const addCryptoContext = createContext();

const Dashboard = () => {
  

  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  //const { data } = useCryptoCurrency(user.watchList);

  
  
  
  


  return (
    
    <div className=''>
            <DashBoard></DashBoard>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-gray-500 to-gray-600">
              <CryptoChartSection></CryptoChartSection>
            </div>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-radial from-slate-600 via-slate-700 to-slate-800">
                <SearchCryptoSection></SearchCryptoSection>
            </div>
            <LabelBottomNavigation></LabelBottomNavigation>
        
            
        
            
    </div>
  )
}

export default Dashboard