import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion';
import SearchBar from '../Components/SearchBar';
import AuthForm from '../Components/AuthForm';
import Dashboard from '../Components/Dashboard';


const PortfolioPage = () => {
  const [test, setTest] = useState(true);
  
  return (
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
        <Dashboard></Dashboard>
          
      
      </motion.div>
  )
}

export default PortfolioPage