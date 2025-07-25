import React, { useState } from 'react'

const MarketsPage = () => {
  const [test, setTest] = useState(false);
  return (
    
    <div className='flex justify-center'>
        {test ? <h1>Yes</h1> : <h1>No</h1>}
        <h1 className='text-red-400'>Markets Page</h1>
    </div>
  )
}

export default MarketsPage