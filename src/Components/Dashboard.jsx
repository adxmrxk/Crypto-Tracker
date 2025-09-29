import {React, useContext, useState} from 'react'
import { UserContext } from '../Pages/SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
  const { data, error, isLoading } = useCryptoCurrency(dumbyWatchList);
  
  


  return (
    <div>
        <div className='border-2 m-3 h-[300px]'>
            <div className='border-2 h-[200px] w-[200px] m-5 rounded-[100%]'>
                <h1 className='mt-20'>Pie Chart Of Wallet</h1>
            </div>
        </div>
    </div>
  )
}

export default Dashboard