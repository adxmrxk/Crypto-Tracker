import React, { useState, useContext, createContext, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";
import ButtonComponent from '../Components/ButtonComponent';
import "aos/dist/aos.css"; 
import AOS from "aos";




export const UserContext = createContext();

const Skeleton = () => {
  
  const [user, setUser] = useState("Adam");

   useEffect(() => {
      AOS.init({
        duration: 2000,   
        once: true,      
      });
    }, []);
  


  return (
    <UserContext.Provider value = {{ user, setUser }}>
      <Outlet /> {/* This is crucial. Don't forget this for next time.*/}
    </UserContext.Provider>
  )
}

export default Skeleton