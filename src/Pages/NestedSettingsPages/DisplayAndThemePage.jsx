import { useState, useContext, createContext } from 'react';
import { UserContext } from '../Skeleton';
import { createRoot } from 'react-dom/client';
import React from 'react'
import ButtonComponent from '../../Components/ButtonComponent'
import { motion } from 'framer-motion';
import ClickableChips from '../../Components/ClickableChips';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ControlledSwitches from '../../Components/ControlledSwitches';

const DisplayAndThemePage = () => {

  const {user, setUser } = useContext(UserContext);

  return (  

    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      <div className='rounded-md w-[100%] h-auto relative top-4 p-3'>
          <h1 className='font-roboto font-bold text-xl my-5 pl-9'>Region</h1>
          <hr className='border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5'></hr>

          {/* Country */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
            <h2 className='font-roboto font-normal w-fit ml-25'>Country</h2>
            <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
              <p className='font-normal'>{user.settings.country}</p>
              <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
            </div>
          </div>

          {/* Currency */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
            <h2 className='font-roboto font-normal w-fit ml-25'>Currency</h2>
            <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
              <p className='font-normal'>{user.settings.currency}</p>
              <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
            </div>
          </div>

          {/* Display Language */}
          <div>
            <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
              <h2 className='font-roboto font-normal w-fit ml-25'>Display Language</h2>
              <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
                <p className='font-normal'>{user.settings.displayLanguage}</p>
                <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
              </div>
            </div>
            <p className='font-roboto text-sm w-fit ml-30 -mt-9'>Defines the language used on CryptoScope's interface.</p>

          </div>

          {/* Content Language */}
          <div>
            <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Gender Changed')}>
              <h2 className='font-roboto font-normal w-fit ml-25'>Content Language</h2>
              <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
                <p className='font-normal'>{user.contentLanguage}</p>
                <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
              </div>
            </div>
            <p className='font-roboto text-sm w-fit ml-30 -mt-9'>Controls the langauge of outside content such as articles.</p>

          </div>


          <h1 className='font-roboto font-bold text-xl pl-9 my-5'>Accessibility</h1>
          <hr className='border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5'></hr>

          {/* Font Size */}
          <div>
            <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
              <h2 className='font-roboto font-normal w-fit ml-25'>Font Size</h2>
              <div className='flex items-center gap-[8px] mr-22 cursor-pointer group'>
                <p className='font-normal'>Default</p>
                <ChevronRightIcon className = 'group-hover:bg-gray-600/20 rounded-2xl'/>
              </div>
            </div>
            <p className='font-roboto text-sm w-fit ml-30 -mt-9'>Controls the size of the font across pages.</p>

          </div>


          <h1 className='font-roboto font-bold text-xl pl-9 my-5'>Appearance</h1>
          <hr className='border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5'></hr>

          {/* Dark Mode */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
            <h2 className='font-roboto font-normal w-fit ml-25'>Dark Mode</h2>
            <div className='pr-24'>
              <ControlledSwitches></ControlledSwitches>
            </div>
          </div>

          {/* Animations */}
          <div className='flex justify-between items-center m-5 mt-10 mb-10' onClick={ () => console.log('Email Changed')}>
            <h2 className='font-roboto font-normal w-fit ml-25'>Animations</h2>
            <div className='pr-24'>
              <ControlledSwitches></ControlledSwitches>
            </div>
          </div>

          <div className='flex justify-center items-center m-5 mt-20 mb-20'>
            <h2 className='font-roboto font-normal w-fit pl-9'>CryptoScope © 2025. All rights reserved</h2>
          </div>

         

          

      </div>
    </motion.div>
 
  )
}

export default DisplayAndThemePage