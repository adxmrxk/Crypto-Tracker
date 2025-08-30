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






export const addCryptoContext = createContext();

const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const { data } = useCryptoCurrency(user.watchList);
  
  
  
  


  return (
    
    <div>
        {/*{addCrypto ? <addCryptoContext.Provider value = {{addCrypto, setAddCrypto}}>
            <AddWatchList></AddWatchList>
        </addCryptoContext.Provider> : null}
        <div className={addCrypto ? 'blur-xs' : ""}>*/}
            <DashBoard></DashBoard>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mt-20 bg-gradient-to-br from-gray-500 to-gray-600">
              <CryptoChartSection></CryptoChartSection>
            </div>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-radial from-slate-600 via-slate-700 to-slate-800">
                <SearchCryptoSection></SearchCryptoSection>
            </div>
        
            
        
            
    </div>
  )
}

export default Dashboard