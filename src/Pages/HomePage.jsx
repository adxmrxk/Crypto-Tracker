import React from 'react';
import Typography from '@mui/material/Typography';
import CryptoCurrency from '../assets/CryptoCurrency2.jpg';
import DigitalCurrency from '../assets/DigitalCurrency.png';
import ClickableChips from './../Components/ClickableChips';
import { motion } from 'framer-motion';
import SignInButton from './../Components/SignInButton';
import CryptoCard from '../Components/CryptoCard';
import AuthForm from '../Components/AuthForm';



const HomePage = () => {
  
  
  const handleClick = () => {
    console.log('Sign in to cryptoscope');
  }
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      

      <div className="relative flex-1">

        <div>
          <div className="relative rounded-lg flex justify-start items-center p-6 flex-1 mt-15">
            <div className=" flex flex-col justify-center flex-grow text-left">
              <Typography variant="button" gutterBottom sx={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: '"Montserrat", "sans-serif"'}}>Cryptoscope</Typography>
              <Typography variant="body1" sx={{ marginTop: '-1.5rem', fontFamily: '"Montserrat"'}}>
                Track your crypto portfolio, stay updated with the latest news, and
                simulate trades to see your investment potential unfold through
                history.
              </Typography>
              <SignInButton buttonClick={handleClick}>Sign Up</SignInButton>
            </div>
            <img src={CryptoCurrency} alt="Crypto" className="w-128 h-128 rounded-md object-cover mr-5"/>
          </div>
        </div>
      </div>
      <div className='mt-15'>
        <CryptoCard></CryptoCard>
        <AuthForm></AuthForm>
      </div>

     


    </motion.div>
  );
};

export default HomePage;
