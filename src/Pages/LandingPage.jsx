import { React, useContext } from 'react';
import Typography from '@mui/material/Typography';
import CryptoCurrency from '../assets/CryptoCurrency2.jpg';
import ClickableChips from './../Components/ClickableChips';
import { motion } from 'framer-motion';
import SignInButton from './../Components/SignInButton';
import CryptoCard from '../Components/CryptoCard';
import AuthForm from '../Components/AuthForm';
import { useState, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContext } from './SkeletonPage';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import CURRENCIES_FRONTEND from '../utils/currenciesFrontEnd';
import CONTENT_LANGUAGES_FRONT_END from '../utils/contentLanguagesFrontEnd';
import FakeChart from '../Components/FakeChart';



const LandingPage = () => {
  
  const { user, setUser } = useContext(UserContext);

  const [signUpClicked, setSignUpClicked] = useState(false);

  

  const handleClick = () => {
    console.log('Sign in to cryptoscope');
    setSignUpClicked(true);
  }

  const handleExit_ = () => {
    setSignUpClicked(!signUpClicked);
  }

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userCountry, setUserCountry] = useState("");
    const [userPassword, setUserPassword] = useState("");
  
    
    const handleSubmit_ = async (event) => {
      event.preventDefault();

      const countryMapping = userCountry.toUpperCase();


      const userObject = {
        email: userEmail,
        username: username,
        gender: "Male",
        settings: {

          country: userCountry,
          currency: CURRENCIES_FRONTEND[countryMapping],
          displayLanguage: CONTENT_LANGUAGES_FRONT_END[countryMapping],
          contentLanguage: CONTENT_LANGUAGES_FRONT_END[countryMapping],

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
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-black/70 via-black/80 to-black/90 " ></div>
        {signUpClicked ? <AuthForm handleEmail={handleEmail_} handleUsername={handleUsername_} handleCountry={handleCountry_} handlePassword={handlePassword_} handleSubmit={handleSubmit_} handleExit = {handleExit_}></AuthForm> : null}
        <div className={`relative z-10 flex-1 ${signUpClicked ? 'blur-xs' : ''}`}>
        
          
        
          <div data-aos="fade-up">
            <div className="relative rounded-lg flex justify-start items-center p-6 flex-1 mt-15">
              <div className=" flex flex-col justify-center flex-grow text-left">
                <h1 className='mb-10 text-7xl font-bold font-roboto bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300  bg-clip-text text-transparent'>Cryptoscope</h1>
                <Typography className = 'text-gray-200' variant="body1" sx={{ marginTop: '-1.5rem', fontFamily: '"Montserrat"'}}>
                  Track your crypto portfolio, stay updated with the latest news, and
                  simulate trades to see your investment potential unfold through
                  history.
                </Typography>
                <SignInButton buttonClick={handleClick} borderColor = 'lightblue' textColor = 'lightgray'>Sign Up</SignInButton>
              </div>
              <img src={CryptoCurrency} alt="Crypto" className="w-128 h-128 rounded-md object-cover"/>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center mt-5'>
            <FakeChart/>
            <div className='flex flex-col items-center' data-aos="fade-left" data-aos-offset="125">
              <h1 className='text-3xl font-bold font-roboto bg-gradient-to-br from-orange-300 via-rose-500 to-purple-500 bg-clip-text text-transparent'>Leverage Advanced Analytics to Track Your Cryptocurrencies</h1>
              <p className='mt-7 text-lg font-roboto w-[500px] text-gray-200'>Gain real-time insights, identify trends, and make smarter investment decisions with data-driven tools.</p>
            </div>
          </div>
        </div>

     


    </>
  );
};

export default LandingPage;
