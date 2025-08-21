import React, { useState, useContext, createContext } from 'react'
import { createRoot } from 'react-dom/client';
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";
import ButtonComponent from '../Components/ButtonComponent';


export const UserContext = createContext();

const Skeleton = () => {
  
  const [user, setUser] = useState("Adam");


  return (
    <UserContext.Provider value = {{ user, setUser }}>
        <LabelBottomNavigation></LabelBottomNavigation>
        <Outlet /> {/* This is crucial. Don't forget this for next time.*/}
    </UserContext.Provider>
  )
}

export default Skeleton