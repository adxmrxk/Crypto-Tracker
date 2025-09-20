import React, {useState} from 'react'
import { Layer2List } from '../../utils/coinCatagories'
import { COIN_DESC } from '../../utils/coinCatagories'
import useCryptoServers from '../../hooks/useCryptoServers'
import { IoFilter } from "react-icons/io5";




const Layer2 = () => {
 const [viewMore, setViewMore] = useState(false);
 

 let layer2Coins = [];
      
    
  layer2Coins = Layer2List.map((coin, index) => {
    return Layer2List[index].id;
})
    
  const {data, loading, error } = useCryptoServers(layer2Coins);
  console.log(data);

  
  return (
    <div>
            <div className='flex flex-row justify-between'>
              <h1 className='font-roboto text-2xl font-semibold text-left mb-5 text-gray-300'>Layer 2</h1>
              <IoFilter className='text-white mr-3 w-[24px] h-[24px]'/>
            </div>
    
            <div className='mb-10'>
              <div className='grid grid-cols-4 grid-rows-1 flex-col gap-3 mb-10'>
                              {data?.slice(viewMore ? 0 : 0, viewMore ? 12 : 8).map((coin, index) => {
                                  return <div className='flex flex-row justify-between bg-gradient-to-r from-black/30 via-black/40 to-black/50 rounded-xs ring ring-gray-100/30 cursor-pointer hover:scale-104 transition-all duration-250 ease-in-out'>
                                      <div className='flex flex-col ml-4 p-2 w-[175px]'>
                                          <h1 className='text-left text-sky-100/60 font-semibold text-xl '>{coin.name}</h1>
                                          <h1 className='text-left text-sky-100/60'>x Members</h1>
                                          <p className='text-left text-sm mt-2 mb-3 leading-tight text-gray-300'>{COIN_DESC[coin.id.toLowerCase().split('-').join('')]}</p>
                                      </div>
                                      <div className='flex flex-col w-fit items-center justify-end gap-5 mb-1'>
                                          <img src = {coin.image} className={` w-[50px] rounded-full mr-5 mt-3`}/>
                                          <h1 className={`bg-blue-200/50 h-fit font-roboto mr-5 text-sm px-3 rounded-xs text-gray-900 mb-5 `}>Join</h1>
                                      </div>
                                  </div>
                              })}
                          </div>
                          <button className='text-black bg-gradient-to-b from-amber-400/70 via-amber-500/80 to-amber-600/90 rounded-full px-4 py-1 cursor-pointer mb-5' onClick={() => {setViewMore(!viewMore)}}>{viewMore ? 'Show Less' : 'Show More'}</button>
    
            </div>
        </div>
  )
}

export default Layer2