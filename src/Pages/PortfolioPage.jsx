import {React, useContext, useState} from 'react'
import { UserContext } from '../Pages/Skeleton'
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import Tooltip from '@mui/material/Tooltip';
import DashBoard from '../Components/Dashboard';
import AddWatchList from '../Components/AddWatchList';






const Dashboard = () => {
  const {user, setUser} = useContext(UserContext);
  const [addCrypto, setAddCrypto] = useState(false);
  const dumbyWatchList = ["bitcoin", "ethereum", "dogecoin", "tether", "ripple"];
  const { data, error, isLoading } = useCryptoCurrency(dumbyWatchList);
  
  


  return (
    <div>
        <DashBoard></DashBoard>
        <button className='mt-20 mr-290 bg-amber-600 py-1 px-5 rounded-md'>Switch</button>
        <div className='border-2 grid grid-cols-2 grid-rows-1 place-items-center mt-5'>
            <div className='border-2 w-[450px] h-[450px] m-3 flex flex-col flex-coljustify-center items-center'>
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
        {addCrypto ? <AddWatchList></AddWatchList> : null}
        <div className='border-2  h-[150px] mb-10 mt-10 flex items-center'>
            <div className='border-2 h-[60px] w-[75%] overflow-hidden rounded-3xl m-3 p-2 flex items-center gap-2'>
                <FaPlus className='w-[16px] h-[16px] ml-3 z-50' onClick={() => {
                    setAddCrypto(!addCrypto);
                    console.log(addCrypto)
                }}/>
                {data?.map((element, index) => 
                        <div className = 'p-3 flex-shrink-0' key = {index}>
                            <Tooltip title = {element.name} placement="top">
                                  <img src={element.image} className='w-[40px] h-[40px]'></img>
                            </Tooltip>
                        </div>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Dashboard