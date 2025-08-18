import React from 'react'
import useCryptoCurrency from '../hooks/useCryptoCurrency'
import Marquee from "react-fast-marquee";

const CryptoCard = () => {
const { data, error, isLoading } = useCryptoCurrency();

  if (error) return <p>Error loading crypto currencies.</p>;
  if (isLoading) return <p>Loading...</p>

  return (
    <Marquee speed = '50' gradient = {true} gradientColor='#d6d3d3'>
      <div className='flex flex-row gap-5 overflow-hidden gradient-mask-t-5'>
          {data.map((element, index) => (
              <div key={index}>
                <div className = 'flex items-center gap-3 p-2'>
                    <img src={element.image} className='w-8 h-8 -mr-1'></img>
                    <h1 className='w-fit whitespace-nowrap'>{element.name}</h1>
                    <h1 className='w-fit pr-5 font-semibold'>${element.current_price}</h1>
                </div>
              </div>
          ))}
      </div>
    </Marquee>
  )
}

export default CryptoCard