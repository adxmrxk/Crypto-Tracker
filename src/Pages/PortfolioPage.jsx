import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion';
import SearchBar from '../Components/SearchBar';

const PortfolioPage = () => {
  const [test, setTest] = useState(true);
  
  return (
    <div className='flex justify-center'>
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
        <SearchBar></SearchBar>
        <div className='grid grid-cols-4 gap-4 border-2 m-3'>
          
        </div>
          
      
      </motion.div>
    </div>
  )
}

export default PortfolioPage