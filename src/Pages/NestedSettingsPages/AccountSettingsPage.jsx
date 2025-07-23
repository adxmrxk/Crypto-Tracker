import { useState } from 'react';
import React from 'react'
import ButtonComponent from '../../Components/ButtonComponent'
import { motion } from 'framer-motion';
import ClickableChips from '../../Components/ClickableChips';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';




function AccountSettingsPage() {
  const [connected, isConnected] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      <div className='rounded-md w-[100%] h-auto relative top-4 p-3'>
          <h1 className='font-roboto font-bold text-xl pl-9 my-5'>General</h1>
          <hr className='border-gray-400 my-1 w-[80%] mx-auto'></hr>

          {/* Email */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
            <h2 className='font-roboto font-normal w-[60px] pl-25'>Email</h2>
            <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
              <p className='font-normal'>adamrak12345@gmail.com</p>
              <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
            </div>
          </div>

          {/* Gender */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Gender Changed')}>
            <h2 className='font-roboto font-normal w-[60px] pl-25'>Gender</h2>
            <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
              <p className='font-normal'>Male</p>
              <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
            </div>
          </div>

          {/* Birthday */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Birthday Changed')}>
            <h2 className='font-roboto font-normal w-[60px] pl-25'>Birthday</h2>
            <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
              <p className='font-normal'>2003-10-01</p>
              <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
            </div>
          </div>

          

         


      
          <h1 className='font-roboto font-bold text-xl pl-9 my-5'>Account Authorization</h1>
          <hr className='border-gray-400 my-1 w-[80%] mx-auto'></hr>

          {/* Google */}          
            <div className='mb-10'>
              <div className='flex justify-between items-center m-5 mt-10'>
                <h2 className='font-roboto font-normal w-[60px] pl-25'>Google</h2>
                <div className='pr-24'>
                  <ClickableChips text = "Connect" varientType= "outlined"></ClickableChips>
                </div>
              </div>
              <p className='font-roboto text-sm w-fit ml-30 -mt-5'>Connect to log in to CryptoScope with your Google account</p>
            </div>

          {/* Apple */}          
            <div className='mb-10'>
              <div className='flex justify-between items-center m-5 mt-8'>
                <h2 className='font-roboto font-normal w-[60px] pl-25'>Apple</h2>
                <div className='pr-24'>
                  <ClickableChips text = "Connect" varientType= "outlined"></ClickableChips>
                </div>
              </div>
              <p className='font-roboto text-sm w-fit ml-30 -mt-5'>Connect to log in to CryptoScope with your Apple account</p>
            </div>
            
    
          
          

      </div>
    </motion.div>
  )
}

export default AccountSettingsPage