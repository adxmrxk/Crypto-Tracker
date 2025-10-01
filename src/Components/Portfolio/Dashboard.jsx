import {React, useContext, useState} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import CoinDisplayChart from './CoinDisplayChart';






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
  const { data, error, isLoading } = useCryptoCurrency(dumbyWatchList);
  
  


  return (
        <div className='border-2 m-3 h-[700px]'>
          <div className='flex flex-row h-[700px] justify-between'>
            <div className='flex flex-col'>
              <div className='b w-fit h-full flex flex-col justify-between'>
                <h1 className='font-roboto font-semibold text-xl text-left ml-5 mt-5'>{user?.username}</h1>
                <div className='border-2 h-[200px] w-[200px] ml-5 mt-5 mb-8 rounded-[100%]'>
                    <CoinDisplayChart></CoinDisplayChart>
                </div>
              </div>
             </div>
             <div className='flex flex-row'>
                {dumbyWatchList.map((element, index) => {
                  return (
                    <div key = {index} className='flex flex-col border-2 h-fit mt-5 mr-5'>
                      <h1 className='font-roboto'>{element}</h1>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
  )
}

export default Dashboard