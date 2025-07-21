import React from 'react'
import ButtonComponent from '../../Components/ButtonComponent'
import { motion } from 'framer-motion';


function AccountSettingsPage() {
  return (
    <motion.div initial={{ scale: 0.90, opacity: 50 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className='border-1 w-[100%] h-auto relative top-4 p-3'>
          <h1 className='font-bold text-base'>General</h1>
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Email:</h2>
            <div className='w-[250px] overflow-x-auto whitespace-nowrap text-right'>
              <h2 className='font-normal inline-block pr-5'>adamrak12345@gmail.com</h2>
                <ButtonComponent text="Change Email" onClick={() => console.log('Change Email clicked')} sx={{ borderRadius: '2px'}} backGroundColor_='#93defc' fontSize_='0.50rem' padding_= '6px' textColor_= "#000000"/>
            </div>
          </div>
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Gender:</h2>
            <div className='w-[250px] overflow-x-auto whitespace-nowrap text-right'>
              <h2 className='font-normal inline-block w-[100px] text-left pr-53.5'>Female</h2>
                <ButtonComponent text="Change Gender" onClick={() => console.log('Change Gender')} sx={{ borderRadius: '2px'}} backGroundColor_='#93defc' fontSize_='0.50rem' padding_= '6px' textColor_= "#000000"/>
            </div>
          </div>
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Birthday:</h2>
          </div>
          <div className='flex justify-between items-center m-5'>
            <h2 className='font-normal w-[60px] pl-5'>Location:</h2>
          </div>
      
      
          <h1 className='font-bold text-base pt-5'>Account Authorization</h1>
          <div>
      
          </div>
      </div>
    </motion.div>
  )
}

export default AccountSettingsPage