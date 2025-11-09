import React from 'react'
import WalletValueChart from './WalletValueChart'
import RiskAndActivity from './RiskAndActivity'

const WalletValue = () => {
  return (
    <div className='flex flex-row justify-between w-[1280px] mx-auto border-2 border-blue-400'>
        <div className='border-2'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-left'>Wallet Value</h1>
                <ul className='flex flex-row gap-3'>
                    <li>1H</li>
                    <li>24H</li>
                    <li>7D</li>
                    <li>1M</li>
                    <li>3MD</li>
                </ul>
            </div>
            <WalletValueChart></WalletValueChart>
            <div className='flex flex-row gap-3 pt-3'>
                <div className='border-3 border-black w-[150px] py-5'>
                    <h1 className='text-sm'>Life Time Earnings</h1>
                </div>
                <div className='border-3 border-black w-[150px] flex items-center justify-center'>
                    <h1 className='text-sm'>Changes Since Last Logged In</h1>
                </div>
                <div className='border-3 border-black w-[150px] flex items-center justify-center'>
                    <h1 className='text-sm'>Unrealized Gains</h1>
                </div>
            </div>
        </div>
        <div className='border-2 border-purple-400 w-[420px]'>
            <RiskAndActivity></RiskAndActivity>
        </div>
    </div>
  )
}

export default WalletValue