import React from 'react'

const ServersComponent = () => {
const fakeServers = ['Bitcoin', 'Ethereum', 'DogeCoin', 'Solana', 'Cardano', 'Polygon', 'Ripple', 'Shiba Inu'];
  return (
    <div className='absolute mt-10 ml-20 flex flex-row justify-center w-[240px]'>
        <div className='grid grid-cols-2 items-center gap-2'>
            {fakeServers.map((server, index) => {
              return <div className='border border-black rounded-xs flex flex-col justify-center px-2 h-[150px]'>
                <h1 className='text-left text-md font-semibold'>{server}</h1>
                <h1 className='text-left text-xs w-[100px]'>x Users Online</h1>
              </div>
            })}
        </div>
        
    </div>
  )
}

export default ServersComponent