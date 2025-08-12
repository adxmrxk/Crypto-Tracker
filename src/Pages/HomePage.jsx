import React from 'react';
import Typography from '@mui/material/Typography';
import CryptoCurrency from '../assets/CryptoCurrency2.jpg';
import DigitalCurrency from '../assets/DigitalCurrency.png';
import ClickableChips from './../Components/ClickableChips';
import { motion } from 'framer-motion';
import SignInButton from './../Components/SignInButton';



const HomePage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      

      <div className="relative flex-1">

        <div className="relative rounded-lg flex justify-start items-center p-6 flex-1">
          <div className=" flex flex-col justify-center flex-grow text-left">
            <Typography variant="button" gutterBottom sx={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: '"Montserrat", "sans-serif"'}}>Cryptoscope</Typography>
            <Typography variant="body1" sx={{ marginTop: '-1.5rem', fontFamily: '"Montserrat"'}}>
              Track your crypto portfolio, stay updated with the latest news, and
              simulate trades to see your investment potential unfold through
              history.
            </Typography>
            <SignInButton>Sign Up</SignInButton>

          </div>
          <img src={CryptoCurrency} alt="Crypto" className="w-128 h-128 rounded-md object-cover mr-5"/>

        </div>
      </div>
      <div className='border-2 h-[500px]'>
        <div className='flex flex-row gap-3 justify-between px-10 mt-10 mb-50'>
          <div className='border-2 p-5 bg-slate-300 rounded-md'>
            <h1 className='font-roboto text-xl font-extrabold'>Education</h1>
            <p className='border-2 w-[300px] mt-5'>Empower users with the knowledge and tools to understand cryptocurrency, market trends, and investment strategies through accessible insights and resources</p>
          </div>
          <div className='border-2 p-5 bg-slate-300 rounded-md'>
            <h1 className='font-roboto text-xl font-extrabold'>Transparency</h1>
            <p className='border-2 w-[300px] mt-5'>Empower users with the knowledge and tools to understand cryptocurrency, market trends, and investment strategies through accessible insights and resources</p>
          </div>
          <div className='border-2 p-5 bg-slate-300 rounded-md'>
            <h1 className='font-roboto text-xl font-extrabold'>Accessibility</h1>
            <p className='border-2 w-[300px] mt-5'>Empower users with the knowledge and tools to understand cryptocurrency, market trends, and investment strategies through accessible insights and resources</p>
          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default HomePage;
