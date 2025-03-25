import { motion } from 'framer-motion';
import { FaBitcoin } from 'react-icons/fa';

interface HeaderProps {
  globalData: any;
}

export const Header = ({ globalData }: HeaderProps) => {
  const formatNumber = (num: number) => {
    if (!num) return '0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatPercent = (num: number) => {
    if (!num) return '0%';
    const sign = num > 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-5 md:p-6 mb-4 md:mb-6 border-b border-gray-800"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center">
          <FaBitcoin className="text-3xl sm:text-4xl mr-3 text-cyber-yellow" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-cyber font-bold text-cyber-primary">
            <span className="text-cyber-secondary">CRYPTO</span>VERSE
          </h1>
        </div>
        
        {globalData && Object.keys(globalData).length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
            <div className="bg-cyber-dark p-2 sm:p-3 rounded-md border border-gray-800 flex-1 sm:flex-none">
              <div className="text-xs text-gray-500 mb-1">Market Cap</div>
              <div className="font-mono text-cyber-accent text-sm sm:text-base">
                {formatNumber(globalData.total_market_cap?.usd)}
              </div>
            </div>
            
            <div className="bg-cyber-dark p-2 sm:p-3 rounded-md border border-gray-800 flex-1 sm:flex-none">
              <div className="text-xs text-gray-500 mb-1">24h Volume</div>
              <div className="font-mono text-cyber-accent text-sm sm:text-base">
                {formatNumber(globalData.total_volume?.usd)}
              </div>
            </div>
            
            <div className="bg-cyber-dark p-2 sm:p-3 rounded-md border border-gray-800 flex-1 sm:flex-none">
              <div className="text-xs text-gray-500 mb-1">BTC Dominance</div>
              <div className="font-mono text-cyber-accent text-sm sm:text-base">
                {formatPercent(globalData.market_cap_percentage?.btc)}
              </div>
            </div>
            
            <div className="bg-cyber-dark p-2 sm:p-3 rounded-md border border-gray-800 flex-1 sm:flex-none">
              <div className="text-xs text-gray-500 mb-1">Active Coins</div>
              <div className="font-mono text-cyber-accent text-sm sm:text-base">
                {globalData.active_cryptocurrencies}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}; 