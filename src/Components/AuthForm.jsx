import React from 'react'
import { useState } from 'react';
import Email from '../assets/mail.png';
import { stringify } from 'postcss';
import axios from 'axios';


const Countries = [
  "Canada",
  "United States of America",
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

const AuthForm = () => {

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [iscreatedUser, setCreatedUser] = useState({});

  
  const handleSubmit = async (event) => {
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
    setCreatedUser(createdUser);
  }

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
  }
  
  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleCountry = (event) => {
    setUserCountry(event.target.value);
  }

  const handlePassword = (event) => {
    setUserPassword(event.target.value);
  }
  

  return (
    <div className="w-[430px] bg-gradient-to-r from-[#cbd0d8] to-[#9a9a9e] p-8 rounded-2xl shadow-lg">

      {/* Header Titles */}
      <div className="flex justify-center mb-4">
        <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
      </div>
      

      {/* Form Section */}
      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Signup Fields */}

        {!isLoginMode && ( <input type="text" placeholder="Name" required className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"/>)}

        <h1 className='text-blue-700'>{iscreatedUser.gender}</h1>
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
  )
}

export default AuthForm