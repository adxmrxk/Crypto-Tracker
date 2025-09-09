import React from 'react'
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import TextAreaNavigation from '../Components/TextAreaNavigation'

const ChatRoomPage = () => {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ">
        <h1>Chat room page</h1>
        <TextAreaNavigation></TextAreaNavigation>
        <div className='border-2 border-gray-800 w-3/5 mx-auto mt-5 h-[750px] relative'>
            <div className='border-b border-black h-[100px]  flex items-center justify-start p-5'>
                <div className='border border-black w-[60px] h-[60px] rounded-full'></div>
                <div className='flex flex-col'>
                    <h1 className='ml-3 font-semibold'>Adam Rak</h1>
                    <div className='flex flex-row items-center justify-center -ml-2'>
                        <div className='w-[5px] h-[5px] rounded-full bg-green-400'></div>
                        <h2 className='ml-1 mb-0.5 text-sm'>Online</h2>
                    </div>
                </div>
                
            </div>

        <div className='border-t border-black absolute bottom-0 w-full h-[70px] flex items-center'>
            <h1 className='w-full'>Text Area</h1>
        </div>
        </div>
        <LabelBottomNavigation></LabelBottomNavigation>
        
    </div>
  )
}

export default ChatRoomPage