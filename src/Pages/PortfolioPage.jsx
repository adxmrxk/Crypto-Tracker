import {React, useContext, useState, createContext} from 'react'
import { UserContext } from '../Pages/Skeleton'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import DashBoard from '../Components/Dashboard';
import AddWatchList from '../Components/AddWatchList';
import SearchCryptoSection from '../Components/SearchCryptoSection';
import CryptoChartSection from '../Components/CryptoChartSection';
import useHistoricalCryptoData from '../hooks/useHistoricCryptoData';





export const addCryptoContext = createContext();

const Dashboard = () => {
  

const now = Math.floor(Date.now() / 1000); 
const yesterday = now - 24 * 60 * 60; 
const oneHourAgo = now - 60 * 60; 
  const oneWeekAgo = now - 24 * 60 * 60 * 7;


  const {data, error, isLoading} = useHistoricalCryptoData('bitcoin', oneWeekAgo, now);
  const prices = [];
  const dates = [];
  if (data) {
    console.log('Data: ', data.prices);
    for (let i = 0; i < data.prices.length; i++) {
      for (let j = 0; j <= data.prices[i].length; j++) {


        
        
        if (j === 0) {
          console.log('Unix Time: ', data.prices[i][j]);
          const unixTimeStamp = data.prices[i][j];
          const dateObject = new Date(unixTimeStamp);
          console.log('Date Time: ', dateObject);
        } 

        if (j === 1) {

          console.log('price: ', data.prices[i][j]);
          prices.push(data.prices[i][j]);
          
        }

      }
    }
  }
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  //const { data } = useCryptoCurrency(user.watchList);

  
  
  
  


  return (
    
    <div>
            <DashBoard></DashBoard>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-gray-500 to-gray-600">
              <CryptoChartSection></CryptoChartSection>
            </div>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-radial from-slate-600 via-slate-700 to-slate-800">
                <SearchCryptoSection></SearchCryptoSection>
            </div>
        
            
        
            
    </div>
  )
}

export default Dashboard