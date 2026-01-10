import React, { useState, useRef, useEffect } from 'react'
import CryptoCurrencyCard from './CryptoCurrencyCard'
import { NameToId } from '../utils/coinNameToId'
import { Search } from 'lucide-react'

const SearchCryptoSection = () => {
  const [searchedCoin, setSearchedCoin] = useState('');
  const [submitedSearch, setSubmitedSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Get all coin names from NameToId
  const coinNames = Object.keys(NameToId);

  // Filter suggestions based on input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = coinNames.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (coinName) => {
    const coinId = NameToId[coinName];
    if (coinId) {
      setSearchedCoin(coinId);
      setSubmitedSearch(true);
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle form submit
  const onSubmit = (event) => {
    event.preventDefault();

    // Try to find exact match or partial match
    const exactMatch = coinNames.find(name =>
      name.toLowerCase() === inputValue.toLowerCase()
    );

    const partialMatch = coinNames.find(name =>
      name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const matchedCoin = exactMatch || partialMatch;

    if (matchedCoin) {
      const coinId = NameToId[matchedCoin];
      setSearchedCoin(coinId);
      setSubmitedSearch(true);
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      // No match found - show alert or handle gracefully
      alert('Coin not found. Please select from the suggestions.');
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle going back to all coins view
  const handleBackToAll = () => {
    setSubmitedSearch(false);
    setSearchedCoin('');
  };

  return (
    <section className=''>
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className='flex justify-center'>
          {/* Custom Search Bar with Autocomplete */}
          <div className="w-[500px] pt-5 mb-10 relative">
            <form onSubmit={onSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
                  placeholder="Search A Crypto Currency"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-400 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
              >
                {suggestions.map((coinName, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSuggestion(coinName)}
                    className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-gray-100 transition-colors border-b border-slate-700 last:border-b-0"
                  >
                    {coinName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back button when viewing single coin */}
        {submitedSearch && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleBackToAll}
              className="px-4 py-2 bg-slate-700 text-gray-100 rounded-lg hover:bg-slate-600 transition-all duration-200 cursor-pointer"
            >
              ← Back to All Coins
            </button>
          </div>
        )}

        <div className='flex justify-center'>
          <CryptoCurrencyCard
            searchedCoin={searchedCoin}
            submitedSearch={submitedSearch}
            setSubmitedSearch={setSubmitedSearch}
          />
        </div>
      </div>
    </section>
  )
}

export default SearchCryptoSection
