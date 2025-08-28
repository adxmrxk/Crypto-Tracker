import { React, useState, useContext } from 'react'
import { addCryptoContext } from '../Pages/PortfolioPage';
import SearchBar from './SearchBar';
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import RecommendedCoins from './RecommendedCoins';
import { AiOutlineClose } from "react-icons/ai";
import { createRoot } from 'react-dom/client';



const AddWatchList = ( handleChange ) => {
    const [searchBarClicked, setSearchBarClicked] = useState(false);
    const { addCrypto, setAddCrypto } = useContext(addCryptoContext);
    
    const handleClick = () => {
        console.log("Search bar clicked");
        setSearchBarClicked(!searchBarClicked);
    };


    

    const { data } = useCryptoCurrency()

  return (
  <div className='fixed inset-0 flex items-center justify-center z-50'>
    <div className='h-[575px] w-[800px] ring ring-blue-800 shadow-2xl rounded-sm pt-5 bg-radial from-slate-600 via-slate-700 to-slate-800' >
      <div className='flex justify-between flex-row w-[73%] mx-auto items-center mt-3'>
        <SearchBar onClick={handleClick}></SearchBar>
        <button className='relative translate-x-20 -translate-y-5'><AiOutlineClose className='text-gray-400 w-[22px] h-[22px] hover:text-white hover:bg-gray-600 transition-all duration-200  rounded-sm cursor-pointer' onClick={() => setAddCrypto(!addCrypto)}/></button>
      </div>
      {searchBarClicked ? <div>
        <h1>Test</h1>
      </div> : <RecommendedCoins/>
 }
    </div>
  </div>
)}

export default AddWatchList

