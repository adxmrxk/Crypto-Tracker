import React from 'react';
import { motion } from 'framer-motion';
import LabelBottomNavigation from '../Components/LabelBottomNavigation';



const HomePage = () => {
  

  

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      
      <div className='border-2'>
        
      </div>
      

     

      <LabelBottomNavigation></LabelBottomNavigation>
    </motion.div>
  );
};

export default HomePage;
