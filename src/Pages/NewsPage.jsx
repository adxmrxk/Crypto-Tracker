import React from 'react';
import useArticles from '../hooks/useArticles';
import { Link } from 'react-router-dom';
import ButtonComponent from '../Components/ButtonComponent';
import { motion } from 'framer-motion';
import { useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContext } from './SkeletonPage';
import ChartSchema from '../utils/chartSchema';



const NewsPage = () => {
  const { user, setUser } = useContext(UserContext);

  var date = new Date();
  date.setDate(date.getDate() - 1);
  console.log(date);


  const { data, error, isLoading, fetchNextPage, hasNextPage } = useArticles('EN', 'general', 6, date);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles.</p>;

  
  

  return (
    
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      <div className='grid grid-cols-3 grid-rows-2 place-items-center mb-10 gap-10 mt-10'>
          {data?.pages?.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.Data?.map((article, index) => (
                  <Link to = {article.URL}>
                    <div key = {index} className='mb-5 mt-5 w-[375px] h-[400px] shadow-2xl shadow-zinc-400  transform scale duration-300 ease-in-out hover:scale-105 rounded-md'>
                        <div className='w-[55%] h-full mx-5 pt-5'>
                          <img src = {article.IMAGE_URL} className='rounded-sm ring-1 ring-slate-600/50'></img>
                          <div className='mt-3'>
                            <h1 className='text-sm font-semibold'>{article.TITLE}</h1>
                            <h1 className='text-sm font-semibold'>{article.SENTIMENT}</h1>
                          </div>
                        </div>
                    </div>
                  </Link>
              ))}
            </React.Fragment>
          ))}
      </div>
      <ChartSchema></ChartSchema>
      <div className='flex justify-start border-2'>
        <h1 className='mt-10 mb-10 ml-10 border-2'>Test</h1>
      </div>
    </motion.div>
  );
};

export default NewsPage;
