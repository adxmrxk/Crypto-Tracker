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
  const { data } = useCryptoCurrency(user.watchList);
  
  
  


  return (
    <div>
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
        {addCrypto ? <AddWatchList></AddWatchList> : null}
        <h1 className='text-left mt-15 -mb-5'>Add To Watch List!</h1>
        <div className='h-[150px] mb-10 mt-1 flex items-center'>
            <div className='bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 h-[70px] max-w-[75%] overflow-hidden rounded-md m-3 p-3 flex items-center gap-1 ring ring-gray-800/30'>
                <FaPlus className='w-[16px] h-[16px] z-50 bg-white rounded-full' onClick={() => {
                    setAddCrypto(!addCrypto);
                    console.log(addCrypto)
                }}/>
                {user.watchList.length > 0 ? data?.map((element, index) => 
                        <div className = 'p-3 flex-shrink-0' key = {index}>
                            <Tooltip title = {element.name} placement="top">
                                  <img src={element.image} className='w-[50px] h-[50px] shadow-2xl aspect-square rounded-full p-2'></img>
                            </Tooltip>
                        </div>
                ) : null}
                
                
            </div>
        </div>
    </div>
  )
}

export default Dashboard