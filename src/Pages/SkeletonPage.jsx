import React, { useState, useContext, createContext, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import { Outlet } from "react-router-dom";
import ButtonComponent from '../Components/ButtonComponent';
import "aos/dist/aos.css";
import AOS from "aos";
import Skeleton2, { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';
import getDeviceInfo from '../utils/loginTracker';

export const UserContext = createContext();

const SkeletonPage = () => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session from localStorage on mount
  useEffect(() => {
    const restoreSession = async () => {
      const savedUserId = localStorage.getItem('cryptoUserId');
      const loginTimestamp = localStorage.getItem('cryptoLoginTime');
      const savedSessionId = localStorage.getItem('cryptoSessionId');

      // Check if session is expired (5 days in milliseconds)
      const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
      const isExpired = !loginTimestamp || (Date.now() - parseInt(loginTimestamp)) > FIVE_DAYS;

      if (savedUserId && !isExpired) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${savedUserId}`);
          setUser(response.data);
          // Refresh the login timestamp (sliding window - resets the 5 day timer)
          localStorage.setItem('cryptoLoginTime', Date.now().toString());
        } catch (err) {
          // If user not found, clear localStorage
          localStorage.removeItem('cryptoUserId');
          localStorage.removeItem('cryptoLoginTime');
          localStorage.removeItem('cryptoSessionId');
          setUser(null);
        }
      } else if (isExpired && savedUserId) {
        // Session expired, clear localStorage
        localStorage.removeItem('cryptoUserId');
        localStorage.removeItem('cryptoLoginTime');
        localStorage.removeItem('cryptoSessionId');
        setUser(null);
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
      localStorage.setItem('cryptoLoginTime', Date.now().toString());

      // Generate and save session ID if not exists
      let sessionId = localStorage.getItem('cryptoSessionId');
      if (!sessionId) {
        const loginInfo = getDeviceInfo();
        sessionId = loginInfo.sessionId;
        localStorage.setItem('cryptoSessionId', sessionId);
      }
    } else {
      localStorage.removeItem('cryptoUserId');
      localStorage.removeItem('cryptoLoginTime');
      localStorage.removeItem('cryptoSessionId');
    }
    setUser(userData);
  };

  // Apply font size to document when user settings change
  useEffect(() => {
    if (user?.settings?.fontSize) {
      document.documentElement.style.fontSize = user.settings.fontSize;
    } else {
      document.documentElement.style.fontSize = '1rem'; // Default
    }
  }, [user?.settings?.fontSize]);

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
