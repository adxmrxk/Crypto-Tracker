import React, {useState} from 'react'
import SearchBar from './SearchBar'
import CryptoCurrencyCard from './CryptoCurrencyCard'
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import { set } from 'mongoose'
import { NameToId } from '../utils/coinNameToId'


const   SearchCryptoSection = () => {
  const [searchedCoin, setSearchedCoin] = useState('');
  const [submitedSearch, setSubmitedSearch] = useState(false);

  
  const {data, isLoading, error} = useCryptoCurrency([searchedCoin]);
  
  const handleChange = (event) => {
    setSearchedCoin(event.target.value);
    
    console.log(searchedCoin);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitedSearch(!submitedSearch);
    const coinId = NameToId[event.target.querySelector("input").value.replace(/ /g, "_")];
    setSearchedCoin(coinId);
    event.target.querySelector("input").value = '';

  }
  

  const handleClick = () => {
    setClickedSearch(!clickedSearch);
    console.log(clickedSearch);

  }



  
  return (
    <section className=''>
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className='flex justify-center'>
            <SearchBar onChange = {handleChange} onClick={handleClick} onSubmit={onSubmit}></SearchBar>
        </div>
        <div className='flex justify-center'>
             <CryptoCurrencyCard searchedCoin = {searchedCoin} submitedSearch={submitedSearch} setSubmitedSearch={setSubmitedSearch}></CryptoCurrencyCard>
        </div>
      </div>
    </section>
  )
}

export default SearchCryptoSection