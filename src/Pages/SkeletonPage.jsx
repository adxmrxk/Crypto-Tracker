import React, { useState, useContext, createContext, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";
import ButtonComponent from '../Components/ButtonComponent';
import "aos/dist/aos.css"; 
import AOS from "aos";
import Skeleton2, { SkeletonTheme } from 'react-loading-skeleton';





export const UserContext = createContext();

const SkeletonPage = () => {
  
  const [user, setUser] = useState("Adam");

   useEffect(() => {
      AOS.init({
        duration: 2000,   
        once: true,      
      });
    }, []);
  


  return (
    <UserContext.Provider value = {{ user, setUser }}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Outlet /> {/* This is crucial. Don't forget this for next time.*/}
      </SkeletonTheme>
    </UserContext.Provider>
  )
}

export default SkeletonPage