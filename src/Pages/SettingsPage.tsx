import React, { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom';
import SettingsNavigationBar from '../Components/SettingsNavigationBar';


const SettingsPage = () => {
  return (

    <div>
      <SettingsNavigationBar></SettingsNavigationBar>
      <Outlet />
    </div>
    
  )
}

export default SettingsPage