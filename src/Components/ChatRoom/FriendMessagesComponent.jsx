import React from 'react'

const FriendMessagesComponent = () => {
  const fakePeople = ['Alice', 'Bob', 'James', 'Dylan', 'Kiran', 'Daniel'];
  return (
    <div className='absolute mt-10 ml-20 flex flex-col justify-center gap-5 overflow-hidden'>
        {fakePeople.map((person, index) => {
            return  <div className='border border-gray-500/45 w-[240px] p-5 flex flex-row items-center '>
                        <div className='border-1 border-black rounded-full h-[40px] w-[40px]'/>
                        <div className='flex flex-col'>
                            <h1 className='text-left ml-2 text-md font-semibold'>{person}</h1>
                            <h1 className='text-left ml-2 text-sm'>Last Text</h1>
                        </div>
                    </div>
        })}
    </div>
  )
}

export default FriendMessagesComponent