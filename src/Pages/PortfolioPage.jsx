import {React, useContext, useState, createContext} from 'react'
import { UserContext } from '../Pages/Skeleton'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import DashBoard from '../Components/Dashboard';
import AddWatchList from '../Components/AddWatchList';
import SearchCryptoSection from '../Components/SearchCryptoSection';






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
            <button className='mt-20 mr-290 bg-amber-600 py-1 px-5 rounded-md'>Switch</button>
            <div className='border-2 grid grid-cols-2 grid-rows-1 place-items-center mt-5'>
                <div className='border-black-2 w-[450px] h-[450px] m-3 flex flex-col flex-coljustify-center items-center'>
                  <div className='border-2 m-3 mt-10 w-[350px] h-[350px] flex justify-center items-center'>
                        <h1>Chart</h1>
                    </div>
                    <button className=''>Button</button>
                </div>
                <div className='border-2 w-[450px] h-[450px] m-3 flex flex-col justify-center items-center'>
                  <div className='border-2 m-3 mt-10 w-[350px] h-[350px] flex justify-center items-center'>
                        <h1>Chart</h1>
                    </div>
                    <button className=''>Button</button>
                </div>
            </div>
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-2 mt-20 bg-radial from-slate-600 via-slate-700 to-slate-800">
                <SearchCryptoSection></SearchCryptoSection>
            </div>
        
            
        
            
    </div>
  )
}

export default Dashboard