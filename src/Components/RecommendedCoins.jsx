import React, { useContext } from 'react'
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import { UserContext } from '../Pages/Skeleton';
import axios from 'axios';


const RecommendedCoins = () => {
  const { data } = useCryptoCurrency()
  const {user, setUser} = useContext(UserContext);
  const addToWatchList = async (name) => {

        const response = await axios.patch(`http://localhost:5000/api/users/${user._id}`, {$addToSet: {watchList: name.toLowerCase()}});
        const newUser = response.data;
        setUser(newUser);
  

    }

  return (
    <div className=''>
        <div className='w-[75%] h-[455px] mx-auto flex justify-center flex-col mt-3 mb-3 bg-radial from-slate-600 via-slate-700 to-slate-800 shadow-2xl p-3 rounded-sm overflow-y-scroll scrollbar-hide'>
        <div className='w-4/5 h-auto max-h-[450px] mx-auto flex flex-col gap-3'>
          {data?.map((element, index) => 
            <div key={index} className='ring-1 ring-blue-400 flex flex-col gap-2 bg-white/10 hover:bg-white/15 p-3 rounded-md shadow transition mt-1 transform scale duration-300 ease-in-out hover:scale-101'>
              <div className='flex flex-row gap-2 items-center'>
                <img src={element.image} alt={element.name} className='w-9 h-9 rounded-full object-contain mb-7.5 ml-5'></img>
                <div className='mb-3'>
                      <h1 className='text-left text-2xl text-gray-300/70 font-semibold truncate'>{element.name}</h1>
                      <h1 className='text-lg text-gray-700 text-left'>{element.symbol.toUpperCase()}</h1>

                </div>
              </div>
              <div className='flex flex-row justify-between items-center mt-3'>
                <div className='flex flex-row items-center'>
                    <h1 className='text-md font-normal text-gray-300'>Price: </h1>
                    <h1 className='text-left text-lg font-bold text-gray-200 mt-0.5 px-2 rounded-sm'>${Number(element.current_price.toFixed(2)).toLocaleString()}</h1>
                    <div className='flex flex-row items-baseline gap-1 ml-3'>
                      <h1 className='text-sm font-normal text-gray-300'>24H: </h1>
                      <h1 className={`text-left text-sm ml-2 mt-0.5 font- px-2 rounded-sm font-semibold ${element.price_change_percentage_24h > 0 ? 'text-green-300 bg-green-500/30' : 'text-red-300 bg-red-500/30'}`}>{`${element.price_change_percentage_24h > 0 ? '+' : ''}${element.price_change_percentage_24h.toFixed(2)}`}%</h1>
                    </div>
                </div>
                <button onClick={() => addToWatchList(element.name)} className='text-md bg-slate-300 px-3 py-1 rounded-lg font-medium hover:bg-slate-400 transition cursor-pointer'>Add</button>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default RecommendedCoins