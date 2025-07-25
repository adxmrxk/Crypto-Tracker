import React from 'react'
import { useState } from 'react'

const PortfolioPage = () => {
  const [test, setTest] = useState(false);
  
  return (
    <div className= {`'flex' justify-center ${test ? 'bg-red-500' : 'bg-blue-500'}`}>
        {test ? <h1>Yes</h1> : <h1>No</h1>}
        <h1 className='text-red-400'>Markets Page</h1>
    </div>
  )
}

export default PortfolioPage