import React, { useState, useContext, createContext, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";
import ButtonComponent from '../Components/ButtonComponent';
import "aos/dist/aos.css";
import AOS from "aos";
import Skeleton2, { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';

export const UserContext = createContext();

const SkeletonPage = () => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session from localStorage on mount
  useEffect(() => {
    const restoreSession = async () => {
      const savedUserId = localStorage.getItem('cryptoUserId');

      if (savedUserId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${savedUserId}`);
          setUser(response.data);
        } catch (err) {
          // If user not found, clear localStorage
          localStorage.removeItem('cryptoUserId');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    restoreSession();

    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  // Custom setUser that also saves to localStorage
  const setUserWithPersist = (userData) => {
    if (userData && userData._id) {
      localStorage.setItem('cryptoUserId', userData._id);
    } else {
      localStorage.removeItem('cryptoUserId');
    }
    setUser(userData);
  };

  // Show loading while restoring session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithPersist }}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Outlet />
      </SkeletonTheme>
    </UserContext.Provider>
  )
}

export default SkeletonPage
