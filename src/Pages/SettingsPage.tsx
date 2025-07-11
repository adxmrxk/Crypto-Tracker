import React from 'react'
import { Link } from 'react-router-dom';


const SettingsPage = () => {
  return (
    <div className='flex flex-row justify-center gap-20'>
      <h1 className='font-normal hover:font-semibold cursor-pointer'>Account Settings</h1>
      <h1 className='font-normal hover:font-semibold cursor-pointer'>Privacy and Data</h1>
      <h1 className='font-normal hover:font-semibold cursor-pointer'>Mock Investing Controls</h1>
      <h1 className='font-normal hover:font-semibold cursor-pointer'>Notifications</h1>
      <h1 className='font-normal hover:font-semibold cursor-pointer'>Display and Theme</h1>

    </div>
  )
}

export default SettingsPage