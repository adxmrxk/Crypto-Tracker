import React from 'react'
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";


const Skeleton = () => {
  return (
    <div>
        <LabelBottomNavigation></LabelBottomNavigation>
        <Outlet /> {/* This is crucial. Don't forget this for next time.*/}

    </div>
  )
}

export default Skeleton