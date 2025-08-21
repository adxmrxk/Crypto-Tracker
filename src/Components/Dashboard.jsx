import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div className='border-2 m-3 h-[300px]'>
            <div className='border-2 h-[200px] w-[200px] m-5 rounded-[100%]'>
                <h1 className='mt-20'>Pie Chart Of Wallet</h1>
            </div>
        </div>
        <div className='border-2 grid grid-cols-2 grid-rows-1 place-items-center mt-20'>
            <div className='border-2 w-[450px] h-[450px] m-3 flex flex-col flex-coljustify-center items-center'>
              <div className='border-2 m-3 mt-10 w-[350px] h-[350px] flex justify-center items-center'>
                    <h1>Chart</h1>
                </div>
                <button className=''>Button</button>
            </div>
            <div className='border-2 w-[450px] h-[450px] m-3 flex flex-col flex-coljustify-center items-center'>
              <div className='border-2 m-3 mt-10 w-[350px] h-[350px] flex justify-center items-center'>
                    <h1>Chart</h1>
                </div>
                <button className=''>Button</button>
            </div>
        </div>
        <div className='border-2  h-[150px] mb-10 mt-10'>
            <h1>Watch List</h1>
            <div className='border-2 h-[50px] rounded-3xl m-3 items-baseline'>

            </div>
        </div>
    </div>
  )
}

export default Dashboard