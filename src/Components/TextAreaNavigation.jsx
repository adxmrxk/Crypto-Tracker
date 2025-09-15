import React, { useState } from 'react'
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import FriendMessagesComponent from './ChatRoom/FriendMessagesComponent';
import ServersComponent from './ChatRoom/ServersComponent';
import SettingsChatRoomComponent from './ChatRoom/SettingsChatRoomComponent';




const TextAreaNavigation = () => {
  const [iconSelected, setIconSelected] = useState('MagnifyGlass')
  return (
    <div className='bg-gradient-to-br from-gray-600/70 via-gray-600/80 to-gray-600/90 w-[50px] hover:w-[350px] rounded-xs absolute h-[757px] flex flex-col items-start transition-all duration-700 cursor-pointer overflow-hidden'>
      {iconSelected === 'Friends' ? <FriendMessagesComponent/> : null}
      {iconSelected === 'Server' ? <ServersComponent/> : null}
      {iconSelected === 'Settings' ? <SettingsChatRoomComponent /> : null}
      <div className='h-[757px] w-[50px] bg-gradient-to-b from-slate-600/70 via-slate-600/80 to-slate-600/90 rounded-xs flex flex-col items-center justify-between'>
        <div>
          <div className='mb-7'>
            <FaMagnifyingGlass className='mb-4 mt-15 w-[32px] h-[22px]' onClick={() => {setIconSelected('MagnifyGlass')}}/>
            <hr className='border-gray-400 my-1'></hr>
          </div>
          <LiaUserFriendsSolid className='w-[32px] h-[28px] mb-7' onClick={() => {setIconSelected('Friends')}}/>
          <CiGlobe className='w-[32px] h-[31px]' onClick={() => {setIconSelected('Server')}}/>
        </div>
        <div className=''>
          <IoSettingsOutline className=' w-[32px] h-[22px] mb-7' onClick={() => {setIconSelected('Settings')}}/>
          <h1 className='text-sm mb-15'>Logo</h1>
        </div>
      </div>




    </div>
  )
}

export default TextAreaNavigation