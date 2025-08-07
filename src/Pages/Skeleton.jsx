import React, { useState } from 'react'
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";
import ButtonComponent from '../Components/ButtonComponent';



const Skeleton = () => {
  const [signedIn, setSignedIn] = useState(true);
  return (
    <div>
        <LabelBottomNavigation></LabelBottomNavigation>
        <div className='absolute top-4 right-10 flex p-2'>
          <ButtonComponent text = 'Log Out' sx = {{ background: 'linear-gradient(to right, #2590fa, #9dc8f2)' }}></ButtonComponent>
        </div>
        <Outlet /> {/* This is crucial. Don't forget this for next time.*/}
        

    </div>
  )
}

export default Skeleton