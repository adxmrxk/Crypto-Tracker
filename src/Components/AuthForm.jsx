import React from 'react'
import { useState } from 'react';
import { stringify } from 'postcss';
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";


const Countries = [
  "Canada",
  "America",
  "Mexico",
  "Brazil",
  "Argentina",
  "Colombia",
  "Chile",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Switzerland",
  "Portugal",
  "Netherlands",
  "Estonia",
  "Malta",
  "India",
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "Indonesia",
  "Philippines",
  "Thailand",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "Bahrain",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Central African Republic",
  "Australia",
  "New Zealand"

]

const AuthForm = ( {handleEmail, handleUsername, handleCountry, handlePassword, handleSubmit, handleExit } ) => {

  const [isLoginMode, setIsLoginMode] = useState(true);

  

  return (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className="w-[430px] bg-gradient-to-br from-[#cbd0d8] to-[#9a9a9e] p-8 rounded-2xl shadow-lg border-1 border-gray-500 ">
          <AiOutlineClose className='text-gray-400 w-[22px] h-[22px] hover:text-white transition-all duration-200 rounded-sm cursor-pointer absolute ml-90 -translate-y-4' onClick = {handleExit}/>
          {/* Header Titles */}
          <div className="flex justify-center mb-4">
            <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
          </div>
        
          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Signup Fields */}
            {!isLoginMode && ( <input type="text" placeholder="Name" required className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"/>)}
            <input type="email" placeholder="Email Address" required className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-600" onChange={handleEmail}/>
            <input type="text" placeholder="Username" required className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-600" onChange={handleUsername}/>
            <div className="w-full flex flex-row p-3 gap-2 border-b-2 border-gray-300 outline-none focus:border-cyan-500">
              <label htmlFor="">
                <select className=' text-gray-600 w-min' defaultValue="" onChange={handleCountry}>
                  <option value="" disabled hidden>Country</option>
                  {Countries.map((country, index) => (
                    <option key = {index} type = "text">{country}</option>
                  ))}
        
        
                </select>
              </label>
            </div>
            <input type="password" placeholder="Password" required className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-600" onChange={handlePassword}/>
            {!isLoginMode && ( <input type="password" placeholder="Confirm Password" required className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"/>)}
            {/* Submit Button */}
            <button type = "submit" className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
              Sign Up
            </button>
          </form>
        </div>
      </div>
  )
}

export default AuthForm