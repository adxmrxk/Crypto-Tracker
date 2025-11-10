import React, {useContext, useState} from 'react'
import axios from 'axios';
import { UserContext } from '../../Pages/SkeletonPage';
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const SingleCryptoCard = ({searchedCoin, submitedSearch, coinsList}) => {
  
  const { user, setUser } = useContext(UserContext);
  const [userInput, setUserInput] = useState({});
  

  //let { data, isLoading, error } = useCryptoCurrency(searchedCoin ? [searchedCoin.toLowerCase()] : []);    
  const userCoin = coinsList = coinsList?.filter(coin => coin.id === searchedCoin?.toLowerCase());
  console.log('User Coin', userCoin);
  console.log('userCoin name', userCoin?.[0]?.name);

  const handleSubmit = async (event, data) => {
    event.preventDefault();
    const input = event.target.querySelector("input"); 
    const value = input.value;
    const coinData = data;
    const response = await axios.patch(`http://localhost:5000/api/addWatchList/${user._id}`, { $addToSet: { watchList: { coin: coinData.name.toLowerCase(), amount: value, ticker: String(coinData.symbol)} } } );
    const newUser = response.data;
    setUser(newUser);
    setUserInput('');
  }


  


  return (
    <div className='grid grid-cols-3 gap-4 p-3 w-[1500px]'>
      {searchedCoin !== 'Bitcoin' && userCoin?.name === 'Bitcoin' ? null : <div className='bg-gradient-to-r from-gray-600 via-gray-700 to-gray-700 ring ring-sky-300 w-auto rounded-xs cursor-pointer hover:scale-102 transition-all duration-250 ease-in-out'>
                        <div className='flex flex-row gap-2 items-center ml-3 mt-3'>
                            
                            <img src={userCoin?.[0]?.image} alt={userCoin?.[0]?.name} className='w-13 h-13 rounded-full mb-30'></img>
                            <div className='flex flex-col'>
                                <h1 className='text-2xl text-gray-100 font-semibold text-left'>{userCoin?.[0].name}</h1>
                                <h1 className='text-lg text-gray-300 font-normal text-left'>{userCoin?.[0]?.symbol?.toUpperCase()}</h1>
                                <div className='mt-5'>
                                    <div className='w-fit ml-[320px] -mb-[67px] flex flex-col items-center'>
                                        <form onSubmit={(event) => handleSubmit(event, userCoin[0])}>
                                            <button type = "submit" className='text-md text-gray-100 bg-slate-900/20 w-fit px-4 py-1 rounded-xs cursor-pointer mb-2 hover:bg-slate-900/40 transition-all duration-300'>Add</button>
                                              <div className='max-w-[75px mx-auto relative z-10'>
                                                  <input type = "number" step="any" placeholder = "Amount" value = {userInput[userCoin.name] || ''} onChange = {(event) =>  setUserInput({ ...userInput, [userCoin?.name]: event.target.value })} className = 'text-white w-[75px] rounded-xs px-2 outline-none border-b'></input>
                                              </div> 
                                        </form>
                                    </div>
                                    <div className='flex flex-row items-center mb-5 mt-10 -translate-x-9'>
                                        <h1 className='text-md font-normal text-gray-300'>Price: </h1>
                                        <h1 className={`text-left text-lg font-semibold text-gray-100 ${userCoin?.[0]?.name ? 'bg-blue-500/20' : ''} rounded-xs px-1 ml-2`}>${Number(userCoin?.[0]?.current_price.toFixed(2)).toLocaleString()}</h1>
                                        <h1 className='text-md font-normal text-gray-300 ml-3'>24h: </h1>
                                        <h1 className={`text-left text-md ml-2 mt-0.5 px-1 rounded-xs font-semibold ${userCoin?.[0]?.price_change_percentage_24h > 0 ? 'text-green-300 bg-green-500/30' : 'text-red-300 bg-red-500/30'}`}>{userCoin?.[0]?.price_change_percentage_24h.toFixed(2)}%</h1>
                                    </div>
                                    
                                </div>
                            </div>
            
                      </div>
                  </div>}
      
    </div>
  )
}

export default SingleCryptoCard