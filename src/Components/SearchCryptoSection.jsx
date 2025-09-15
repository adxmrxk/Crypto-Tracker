import React, {useState} from 'react'
import SearchBar from './SearchBar'
import CryptoCurrencyCard from './CryptoCurrencyCard'
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import { set } from 'mongoose'


const SearchCryptoSection = () => {
  const [searchedCoin, setSearchedCoin] = useState('');
  const [clickedSearch, setClickedSearch] = useState(false);

  
  
  const handleChange = (event) => {
    setSearchedCoin(event.target.value);
    
    console.log(searchedCoin);
  }
  
  const {data, isLoading, error} = useCryptoCurrency([searchedCoin]);

  const handleClick = () => {
    setClickedSearch(!clickedSearch);
    console.log(clickedSearch);

  }



  
  return (
    <section className='border-2'>
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className='flex justify-center'>
            <SearchBar onChange = {handleChange} onClick={handleClick}></SearchBar>
        </div>
        <div className='flex justify-center'>
            { clickedSearch ? null : <CryptoCurrencyCard></CryptoCurrencyCard>}
        </div>
      </div>
    </section>
  )
}

export default SearchCryptoSection