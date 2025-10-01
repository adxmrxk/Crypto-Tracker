import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { COIN_DESC_LONG } from '../../utils/coinCatagories'
import { Layer1List } from '../../utils/coinCatagories'
import useCryptoServers from '../../hooks/useCryptoServers'
import { IoFilter } from "react-icons/io5";
import { Scrollbar } from 'react-scrollbars-custom';
import axios from 'axios'

const Layer1 = () => {
  const [viewMore, setViewMore] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const {user, setUser} = useContext(UserContext);

  let layer1Coins = [];
  const [shuffledData, setShuffledData] = useState([]);

  layer1Coins = Layer1List.map((coin, index) => {
    return Layer1List[index].id;
  })  

  const {data, loading, error } = useCryptoServers(layer1Coins);
  console.log('Layer 1 Coins', data);

  useEffect(() => {
    for (let i = data?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
  }, [data]);

  const handleClick = () => {
    if (viewMore >= 9) {
      setViewMore(3);
      setExpanded(false);
      return;
    }
    setViewMore(viewMore + 3);
    setExpanded(true);
    return;
  }

  const addServerList = async (coin) => {
    const coinId = coin.id;
    console.log(coin.id);
    const response = await axios.patch(`http://localhost:5000/api/addServer/${user._id}`, { $addToSet: { serverList: coinId } } );
    const newUser = response.data;
    setUser(newUser);


  }

  console.log(data); // arr is now shuffled in place

  return (
        <div className=' h-[600px] overflow-hidden'>
          <div className='flex flex-row justify-between items-center mx-auto mb-2'>
            <h1 className='font-roboto text-2xl font-semibold text-left ml-12 text-gray-300'>Layer 1</h1>
            <IoFilter className='text-gray-200 w-[20px] h-[20px] mr-15'/>
          </div>
          <div className='mb-10'>
            <Scrollbar style = {{ width: '100%', height: 470}} noScrollX>
              <div className=' flex-col gap-5 mb-7'>
                              {data?.slice(expanded ? 0 : 0, expanded? viewMore : 3).map((coin, _index) => {
                                  return <div className='flex flex-row mt-1 w-[1147px] mx-auto justify-between bg-gradient-to-r from-black/30 via-black/40 to-black/50 rounded-xs ring ring-gray-100/30 cursor-pointer hover:scale-103 transition-all duration-250 ease-in-out mb-2'>
                                      <div className='flex flex-col ml-4 p-2 w-[175px]'>
                                          <h1 className='text-left text-sky-100/60 font-semibold text-xl '>{coin.name}</h1>
                                          <h1 className='text-left text-sky-100/60'>x Members</h1>
                                          <p className='text-left text-sm mt-2 mb-3 leading-tight text-gray-300 whitespace-nowrap '>{COIN_DESC_LONG[coin.id.toLowerCase().split('-').join('')]}</p>
                                      </div>
                                      <div className='flex flex-col w-fit items-center justify-end gap-5 mb-1'>
                                          <img src = {coin.image} className={` w-[55px] rounded-full mr-5 mt-3`}/>
                                          <h1 className={`bg-blue-200/50 h-fit font-roboto mr-5 text-sm px-3 rounded-xs text-gray-900 mb-5 `} onClick={() => addServerList(coin)}>Join</h1>
                                      </div>
                                  </div>
                              })}
                          </div>
            <button className='text-black text-sm bg-gradient-to-b from-amber-400/70 via-amber-500/80 to-amber-600/90 rounded-full px-4 py-1 cursor-pointer' onClick={handleClick}>{viewMore >= 9 ? 'Show Less' : 'Show More'}</button>
            </Scrollbar>
          </div>
        </div>
  )
}

export default Layer1
