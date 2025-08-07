import React from 'react';
import useArticles from '../hooks/useArticles';
import { Link } from 'react-router-dom';
import ButtonComponent from '../Components/ButtonComponent';
import { motion } from 'framer-motion';



const NewsPage = () => {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  console.log(date);


  const { data, error, isLoading, fetchNextPage, hasNextPage } = useArticles('EN', 'general', 6, date);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles.</p>;
  

  return (
    
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut"}}>
      <div className='grid grid-cols-3 grid-rows-2 place-items-center mb-10 gap-5 mt-10'>
          {data?.pages?.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.Data?.map((article, index) => (
                  <Link to = {article.URL}>
                    <div key = {index} className='mb-22 mt-5 w-[275px] h-[275px] shadow-2xl shadow-gray-400 transform scale duration-300 ease-in-out hover:scale-105'>
                      <img src = {article.IMAGE_URL} className='rounded-sm '></img>
                      <h1 className='w-[270px] mt-3 text-sm'>{article.TITLE}</h1>
                      <div className='flex flex-row'>
                        <p className='text-left mt-3 ml-3 text-xs border-2 w-fit'>{article.KEYWORDS.split('|')[0]}</p>
                        {article.KEYWORDS.split('|')[1] ? <p className='text-left mt-3 ml-3 text-xs border-2 w-fit'>{article.KEYWORDS.split('|')[1]}</p> : null}
                      </div>
                    </div>
                  </Link>
              ))}
            </React.Fragment>
          ))}
      </div>
    </motion.div>
  );
};

export default NewsPage;
