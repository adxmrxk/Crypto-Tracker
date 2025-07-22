import { useState } from 'react';
import React from 'react'
import ButtonComponent from '../../Components/ButtonComponent'
import { motion } from 'framer-motion';



function AccountSettingsPage() {
  const [connected, isConnected] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      <div className='border-1 rounded-md w-[100%] h-auto relative top-4 p-3'>
          <h1 className='font-roboto font-bold text-xl pl-9 my-5'>General</h1>
          <hr className='border-gray-600 my-1 w-[80%] mx-auto'></hr>

          {/* Email */}
          <div className='flex justify-between items-center m-5 mt-8'>
            <h2 className='font-roboto font-normal w-[60px] pl-5'>Email</h2>
            <div className='w-[250px] overflow-x-auto whitespace-nowrap text-right'>
              <p className='font-normal inline-block pr-5'>adamrak12345@gmail.com</p>
              <ButtonComponent text="Change Email" onClick={() => console.log('Change Email clicked')} sx={{ borderRadius: '2px'}} backGroundColor_='#93defc' fontSize_='0.50rem' padding_= '6px' textColor_= "#000000"/>
            </div>
          </div>

          {/* Gender */}
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Gender</h2>
            <div className='w-[250px] overflow-x-auto whitespace-nowrap text-right'>
              <h2 className='font-normal inline-block w-[100px] text-left pr-53.5'>Female</h2>
              <ButtonComponent text="Change Gender" onClick={() => console.log('Change Gender')} sx={{ borderRadius: '2px'}} backGroundColor_='#93defc' fontSize_='0.50rem' padding_= '6px' textColor_= "#000000"/>
            </div>
          </div>

          {/* Birthday */}
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Birthday</h2>
            <div className='w-[250px] overflow-x-auto whitespace-nowrap text-right'>
              <h2 className='font-normal inline-block w-[100px] text-left pr-53.5'>2003-10-01</h2>
              <ButtonComponent text="Change Birthday" onClick={() => console.log('Change birthday clicked')} sx={{ borderRadius: '2px'}} backGroundColor_='#93defc' fontSize_='0.50rem' padding_= '6px' textColor_= "#000000"/>
            </div>
          </div>


      
          <h1 className='font-roboto font-bold text-xl pl-9 my-5'>Account Authorization</h1>
          <hr className='border-gray-600 my-1 w-[80%] mx-auto'></hr>

          {/* Google Sign-Up*/}
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Google</h2>
            <div className='w-[250px] overflow-x-auto whitespace-nowrap text-right'>
              <h2 className='font-normal inline-block w-[100px] text-left pr-53.5'>{connected === true ? "Disconnect" : "Connect"}</h2>
              <ButtonComponent text="Change Birthday" onClick={() => console.log(`Connected Status: ${connected ? 'True' : 'False'}`)} sx={{ borderRadius: '2px'}} backGroundColor_='#93defc' fontSize_='0.50rem' padding_= '6px' textColor_= "#000000"/>
            </div>
          </div>

      </div>
    </motion.div>
  )
}

export default AccountSettingsPage