import React from 'react'
import {useState, useContext} from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiMemoPad } from "react-icons/ci";





const HomePannel = () => {

  const {user, setUser} = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState('');
  const [overAllUp, setOverAllUp] = useState(1500);

  const updateOverAllUp = () => {
    return 
  }

  return (
    <div className='w-[80%] mx-auto'>
        <div className='flex flex-col border-2'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-2xl font-semibold text-gray-800 text-left mb-3'>{user?.username}</h1>
              <ul className='flex flex-row gap-3'>
                <li><IoChatbubbleEllipsesOutline /></li>
                <li><CiCirclePlus /></li>
                <li><CiMemoPad /></li>
              </ul>
          </div>
          <div className='flex flex-row border-2 mb-5'>
            <h1 className='text-left text-lg'>{overAllUp}</h1>
            <select className='text-sm ml-3'>
              <option>Test 1</option>
              <option>Test 2</option>
              <option>Test 3</option>
              <option>Test 4</option>
              <option>Test 5</option>
            </select>
          </div>
          <div className='border-4 flex justify-start border-red-200 w-[600px] h-[300px]'>
            <h1>Portfolio Chart</h1>
          </div>

        </div>
    </div>
  )
}

export default HomePannel