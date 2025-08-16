import React from 'react'
import useCryptoCurrency from '../hooks/useCryptoCurrency'

const CryptoCard = () => {
const { data, error, isLoading } = useCryptoCurrency();

  if (error) return <p>Error loading crypto currencies.</p>;
  if (isLoading) return <p>Loading...</p>

  return (
    <div className='border-2 flex flex-row gap-5 overflow-hidden'>
        {data.map((element, index) => (
            <div className='' key={index}>
            <div className = 'flex items-center gap-3 p-2'>
                <img src={element.image} className='w-8 h-8 -mr-1'></img>
                <h1 className='w-fit whitespace-nowrap'>{element.name}</h1>
                <h1 className='w-fit pr-5'>${element.current_price}</h1>
            </div>
            </div>
        ))}
    </div>
  )
}

export default CryptoCard