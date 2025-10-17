import React from 'react'
import {useState, useContext} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'

const HomePannel = () => {
  const {user, setUser} = useContext(UserContext);
  return (
    <div className='w-[80%] mx-auto'>
        <div className=''>
          <h1 className='text-xl text-gray-800 text-left'>{user?.username}</h1>

        </div>
    </div>
  )
}

export default HomePannel