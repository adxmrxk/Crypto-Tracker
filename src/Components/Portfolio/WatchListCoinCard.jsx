import React, { useState, useContext } from 'react'
import { Bell, BellOff, X } from 'lucide-react'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import { UserContext } from '../../Pages/SkeletonPage'
import ControlledSwitches from '../ControlledSwitches'

const WatchListCoinCard = ({coin, coinClicked, setCoinClicked}) => {

  const { data } = useCryptoCurrency([coin.coin])
  const {user, setUser} = useContext(UserContext)

  const [holdings, setHoldings] = useState(
    user?.watchList?.find(item => item.coin.toLowerCase() === data?.[0]?.id?.toLowerCase())?.amount || ''
  )

  const [priceAlert, setPriceAlert] = useState('')
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const coinData = data?.[0]

  const handleSave = () => {

    console.log('Saving:', { holdings, priceAlert, notificationsEnabled })

  }

  const handleClose = () => {
    setCoinClicked(false)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm px-4'>
      <div className='w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden'>
        
        <div className='bg-gradient-to-r from-blue-400 to-purple-500 p-6 relative'>
          <button onClick={handleClose} className='absolute top-4 right-4 text-white/80 hover:text-white transition-colors'>
            <X size={24} className='cursor-pointer'/>
          </button>
          <div className='flex flex-col justify-start items-start gap-4'>
            <img src={coinData?.image} alt={coinData?.name} className='w-16 h-16 rounded-full ring-4 ring-white/20'/>
            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-white ml-2'>{coinData?.name}</h2>
              <p className='text-white/80 text-sm uppercase text-left ml-2'>{coinData?.symbol}</p>
            </div>
          </div> 
        </div>

        <div className='p-6 space-y-6'>
          <div>
            <label className='block text-gray-300 text-sm font-medium mb-2'>Your Holdings</label>
            <div className='relative'>
              <input type='number' value={holdings} onChange={(e) => setHoldings(e.target.value)} placeholder='Enter amount' step='any' className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'/>
              <span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm uppercase'>
                {coinData?.symbol}
              </span>
            </div>
            {holdings && (
              <p className='mt-2 text-sm text-gray-400'>
                Portfolio Value: <span className='text-green-400 font-semibold'>
                  ${(holdings * coinData?.current_price).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </span>
              </p>
            )}
          </div>

          <div className='flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700'>
            <div className='flex items-center gap-3'>
              {notificationsEnabled ? <Bell size={20} className='text-blue-400' /> : <BellOff size={20} className='text-gray-500' />}
              <div>
                <p className='text-white font-medium text-left'>Price Alerts</p>
                <p className='text-gray-400 text-xs'>Get notified of price changes</p>
              </div>
            </div>
            <ControlledSwitches checked={notificationsEnabled} onChange={setNotificationsEnabled}/>
          </div>
          


          {notificationsEnabled && (
            <form>
              <label className='block text-gray-300 text-sm font-medium mb-2'> Alert Price </label>
              <input type='number' value={priceAlert} onChange={(e) => setPriceAlert(e.target.value)} placeholder='Set target price' step='any' className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'/>
            </form>
          )}

          

          <div className='flex gap-3 pt-4'>
            <button type='button' onClick={handleClose} className='flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg font-medium transition-colors cursor-pointer'>Cancel</button>
            <button type='button' onClick={handleSave} className='flex-1 px-4 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg cursor-pointer font-medium transition-all shadow-lg'>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchListCoinCard