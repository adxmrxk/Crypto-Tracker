import React from 'react'
import { useState } from 'react'
const HomePage = () => {
    const [test, setTest] = useState(false);
  
  return (
    <div className = {`'flex' justify-center ${test ? 'bg-red-500' : null} shadow-green-600`}>
        <h1 className={`'text-blue-500' ${test ? 'bg-red-500' : null} 'text-2xl' `}>Home Page</h1>
    </div>
  )
}

export default HomePage