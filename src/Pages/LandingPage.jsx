import { React, useContext } from 'react';
import Typography from '@mui/material/Typography';
import CryptoCurrency from '../assets/CryptoCurrency2.jpg';
import DigitalCurrency from '../assets/DigitalCurrency.png';
import ClickableChips from './../Components/ClickableChips';
import { motion } from 'framer-motion';
import SignInButton from './../Components/SignInButton';
import CryptoCard from '../Components/CryptoCard';
import AuthForm from '../Components/AuthForm';
import { useState, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContext } from './Skeleton';
import axios from 'axios';
import { Navigate } from 'react-router-dom';




const LandingPage = () => {
  
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    console.log('Sign in to cryptoscope');
  }

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userCountry, setUserCountry] = useState("");
    const [userPassword, setUserPassword] = useState("");
  
    
    const handleSubmit_ = async (event) => {
      event.preventDefault();
      const userObject = {
        email: userEmail,
        username: username,
        gender: "Male",
        settings: {
          country: userCountry
        },
        password: userPassword
      };
  
      const response = await axios.post('http://localhost:5000/api/users', userObject);
      const createdUser = response.data;
      setUser(createdUser);
    }
    
    if (user.username) {
       return <Navigate to="/HomePage" replace />;
    }
    
    const handleEmail_ = (event) => {
      setUserEmail(event.target.value);
      console.log(userEmail);
    }
    
    const handleUsername_ = (event) => {
      setUsername(event.target.value);
    }
  
    const handleCountry_ = (event) => {
      setUserCountry(event.target.value);
    }
  
    const handlePassword_ = (event) => {
      setUserPassword(event.target.value);
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
        <AuthForm handleEmail={handleEmail_} handleUsername={handleUsername_} handleCountry={handleCountry_} handlePassword={handlePassword_} handleSubmit={handleSubmit_}></AuthForm>
      </div>

     


    </motion.div>
  );
};

export default LandingPage;
