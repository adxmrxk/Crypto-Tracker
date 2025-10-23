import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Pages/SkeletonPage'
import useCryptoCurrency from '../../hooks/useCryptoCurrency'
import { TrendingUp } from 'lucide-react'

const TopWinners = () => {

  const { user } = useContext(UserContext);
  const [sortedData, setSortedData] = useState([]);

  const coinNames = user?.watchList.map((element) => element.coin) || []
  const { data } = useCryptoCurrency(coinNames);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const sorted = [...data].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      setSortedData(sorted);
    }
  }, [data]);

  const WinnerCard = ({ rank, coin }) => {
    if (!coin) return null;

    const previousPrice = coin.current_price / (1 + coin.price_change_percentage_24h / 100);
    const changePercent = coin.price_change_percentage_24h;
    const isPositive = changePercent >= 0;

    const rankColors = {
      1: 'from-yellow-400 to-yellow-600',
      2: 'from-gray-300 to-gray-500',
      3: 'from-amber-600 to-amber-800'
    };

    return (
      <div className='group relative mb-4 rounded-md bg-gradient-to-r from-slate-800 to-slate-700 p-4 transition-all duration-300 hover:shadow-lg hover:from-slate-700 hover:to-slate-600 hover:scale-105 cursor-pointer border border-slate-600 hover:border-cyan-500'>
        <div className='flex items-center gap-4'>
          
          <div className='relative flex-shrink-0'>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${rankColors[rank]} blur-md opacity-50`}></div>
            <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center font-black text-lg text-slate-900 shadow-lg`}>
              {rank}
            </div>
          </div>

          
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-2'>
              <img src={coin.image} alt={coin.name} className='w-6 h-6 rounded-full' />
              <h3 className='font-semibold text-white truncate'>{coin.name}</h3>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <span className='text-xl font-bold text-white'>${coin.current_price.toFixed(2)}</span>
                <span className='text-xs text-slate-400'>prev: ${previousPrice.toFixed(2)}</span>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${
                isPositive 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                <TrendingUp size={14} className={isPositive ? '' : 'rotate-180'} />
                {changePercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='rounded-sm bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 p-6 shadow-2xl w-full max-w-md'>
      <h2 className='mb-6 text-2xl font-bold text-white flex items-center justify-center gap-2'>
        <h1 className='text-2xl flex justify-center bg-gradient-to-r from-blue-300 to-purple-500 bg-clip-text text-transparent'>Top Preformers</h1>
        
      </h2>
      
      <div className='space-y-3'>
        {sortedData.slice(0, 3).map((coin, index) => (
          <WinnerCard
            key={coin.id}
            rank={index + 1}
            coin={coin}
          />
        ))}
      </div>
    </div>
  );
};

export default TopWinners;