import React, { useState } from 'react'
import AuthForm from '../Components/AuthForm';


const MarketsPage = () => {
  const [test, setTest] = useState(false);
  return (
    
    <div className='flex justify-center'>
        {test ? <h1>Yes</h1> : null}
        <AuthForm></AuthForm>
        
    </div>
  )
}

export default MarketsPage