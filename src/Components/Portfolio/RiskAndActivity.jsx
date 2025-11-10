import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../Pages/SkeletonPage';

const RiskAndActivity = () => {

  const {user, setUser} = useContext(UserContext)

  return (
    <div className=''>
        <div className=''>
            <h1 className='text-left text-md font-semibold'>Portfolio Risk Score</h1>
            <div className='border-2 p-3 mt-2 w-[405px]'></div>
            <div className='flex flex-row gap-3 mt-2'>
                <p1>Blah</p1>
                <p1>Blah</p1>
                <p1>Blah</p1>
            </div>
        </div>
        <div className='mt-7'>
            <h1 className='text-left mb-2 text-md font-semibold'>Transactions</h1>
            <div className='grid grid-cols-3 gap-3'>
                {user?.watchList.map((element, index) => {
                    return <div className='w-[120px] h-[116px] rounded-md bg-gradient-to-br from-gray-800/60 via-gray-800/70 to-gray-800/80'>
                        <div className='flex flex-row items-center px-1'>
                            <img src = {element.image} className='w-[29px] h-[29px]'></img>
                            <div className='flex flex-col pl-1'>
                                <h1 className='text-md text-left -mb-1 text-gray-200'>{element.coin}</h1>
                                <h2 className='text-xs'>2025-10-17</h2>
                            </div>
                        </div>
                        <h1 className='text-left text-sm px-2 mt-5'>{element.ticker.toUpperCase()}</h1>
                        <h1 className='text-left text-sm px-2 -mt-1'>5.545454</h1>
                        <h1 className='text-left text-sm px-2 -mt-1'>12</h1>
                    </div>
                })}
                
            
            </div>
        </div>
    </div>
  )
}

export default RiskAndActivity