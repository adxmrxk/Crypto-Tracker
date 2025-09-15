import React from 'react'

const ChatSection = () => {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 pt-5">
        <div className='border-2 border-gray-800 w-3/5 mx-auto mt-5 h-[750px] relative'>
            <div className='border-b border-black h-[100px]  flex items-center justify-start p-5'>
                <div className='border border-black w-[60px] h-[60px] rounded-full'></div>
                <div className='flex flex-col'>
                    <h1 className='font-semibold -ml-11'>Bitcoin</h1>
                    <div className='flex flex-row items-center justify-center ml-3'>
                        <div className='w-[5px] h-[5px] rounded-full bg-green-400'></div>
                        <h2 className='ml-1 mb-0.5 text-sm'>73 Users Online</h2>
                    </div>
                </div>
                
            </div>

        <div className='border-t border-black absolute bottom-0 w-full h-[70px] flex items-center'>
            <h1 className='w-full'>Text Area</h1>
        </div>
        
        </div>
         <div className='flex justify-center items-center m-5 mt-20 mb-20'>
            <h2 className='font-roboto font-normal w-fit pl-9'>CryptoScope © 2025. All rights reserved</h2>
        </div>
    </div>
  )
}

export default ChatSection