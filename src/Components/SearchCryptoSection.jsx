import React from 'react'
import SearchBar from './SearchBar'
import CryptoCurrencyCard from './CryptoCurrencyCard'

const SearchCryptoSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className='flex justify-center'>
            <SearchBar></SearchBar>
        </div>
        <div className='flex justify-center'>
            <CryptoCurrencyCard></CryptoCurrencyCard>
        </div>
      </div>
    </section>
  )
}

export default SearchCryptoSection