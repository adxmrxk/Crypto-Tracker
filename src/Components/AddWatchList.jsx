import { React, useState } from 'react'
import SearchBar from './SearchBar';
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import RecommendedCoins from './RecommendedCoins';

const AddWatchList = (handleChange) => {
    const [searchBarClicked, setSearchBarClicked] = useState(false);
    
    const handleClick = () => {
        console.log("Search bar clicked");
        setSearchBarClicked(!searchBarClicked);
    };

    const addToWatchList = (name) => {
        console.log("In WatchList Function")
        console.log(name);
    }
    

    const { data } = useCryptoCurrency()

  return (
  <div className='fixed inset-0 flex items-center justify-center z-5'>
    <div className='h-[575px] w-[900px] bg-gradient-to-br from-[#a5b9d6] via-[#879bbb] ring ring-blue-800 to-[#5f6f8b] shadow-2xl rounded-xl pt-5'>
      <div className='flex justify-between flex-row w-[73%] mx-auto items-center'>
        <SearchBar onClick={handleClick}></SearchBar>
      </div>
      {searchBarClicked ? <div>
        <h1>Test</h1>
      </div> : <RecommendedCoins/>
 }
    </div>
  </div>
)}

export default AddWatchList