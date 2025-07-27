import React, { useState } from 'react'

const MarketsPage = () => {
  const [test, setTest] = useState(false);
  return (
    
    <div className='flex justify-center'>
        {test ? <h1>Yes</h1> : null}
    </div>
  )
}

export default MarketsPage