import React from 'react'
import { useState } from 'react'

const PortfolioPage = () => {
  const [test, setTest] = useState(true);
  
  return (
    <div>
      <div className= {`'flex' justify-center ${test ? 'bg-red-500' : 'bg-blue-500'}`}>
          {test ? <h1>Yes</h1> : null}
          <h1>Test</h1>
      
      </div>

      

    </div>
  )
}

export default PortfolioPage