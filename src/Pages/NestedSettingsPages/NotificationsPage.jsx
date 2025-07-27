import { useState } from 'react';
import React from 'react'
import ButtonComponent from '../../Components/ButtonComponent'
import { motion } from 'framer-motion';
import ClickableChips from '../../Components/ClickableChips';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ControlledSwitches from '../../Components/ControlledSwitches';

const NotificationsPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  return ( 

    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      <div className='rounded-md w-[100%] h-auto relative top-4 p-3'>
          

          
            <h1 className='font-roboto font-bold text-xl my-5 pl-9'>Account Security</h1>
            <hr className='border-gray-400 my-1 w-[80%] mx-auto'></hr>

            
            {/* Two-factor Authentication */}          
                        <div>
                          <div className='flex justify-between items-center m-5 mt-8'>
                            <h2 className='font-roboto font-normal w-[380px]'>Two-factor authentication</h2>
                            <div className='pr-24'>
                              <ControlledSwitches></ControlledSwitches>
                            </div>
                          </div>
                          <p className='font-roboto text-sm w-fit ml-30 -mt-6'>Secure your CryptoScope account with two-factor authentication</p>
            
                        </div>
            
              
            

            {/* Recovery */}
            <div>
              <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Gender Changed')}>
                <h2 className='font-roboto font-normal w-fit ml-25'>Recovery Email</h2>
                <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
                  <p className='font-normal'>adamrak239@gmail.com</p>
                  <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
                </div>
              </div>
              <p className='font-roboto text-sm w-fit ml-30 -mt-9'>Secure your CryptoScope account with two-factor authentication</p>
            </div>
              
              {/* Change Password */}
              <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
                <h2 className='font-roboto font-normal w-fit ml-25'>Change Password</h2>
                  <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
                    <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
                  </div>
              </div>

          <div className='flex justify-center items-center m-5 mt-20 mb-20'>
            <h2 className='font-roboto font-normal w-fit pl-9'>CryptoScope © 2025. All rights reserved</h2>
          </div>

         

          

      </div>
    </motion.div>

  )
}

export default NotificationsPage