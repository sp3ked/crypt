import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CoinCardProps {
  coin?: any;
  index?: number;
  loading?: boolean;
}

export const CoinCard = ({ coin, index = 0, loading = false }: CoinCardProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Randomly trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // Higher chance of glitching on price changes
      const shouldGlitch = Math.random() < 0.1;
      if (shouldGlitch) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 250);
      }
    }, 5000 + index * 2000); // Stagger effect based on index
    
    return () => clearInterval(glitchInterval);
  }, [index]);

  const priceChangeColor = (change: number) => {
    if (change > 0) return 'text-cyber-green';
    if (change < 0) return 'text-cyber-primary';
    return 'text-cyber-accent';
  };

  const formatPercent = (num: number) => {
    if (!num && num !== 0) return 'N/A';
    const sign = num > 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
  };

  const formatPrice = (price: number) => {
    if (!price && price !== 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (!marketCap) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(marketCap);
  };

  // Loading state
  if (loading) {
    return (
      <Card 
        glowColor="secondary"
        className="h-full relative overflow-hidden"
      >
        {/* Data line animation */}
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyber-secondary to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyber-secondary to-transparent opacity-50"></div>
        
        <div className="flex items-start justify-between mb-4 animate-pulse">
          <div className="flex items-center">
            <div className="rounded-full mr-3 h-10 w-10 bg-cyber-primary/20"></div>
            <div>
              <div className="h-5 bg-cyber-primary/20 rounded w-24 mb-2"></div>
              <div className="h-3 bg-cyber-primary/10 rounded w-16"></div>
            </div>
          </div>

          <div className="text-right">
            <div className="h-6 bg-cyber-primary/20 rounded w-20 mb-1"></div>
            <div className="h-3 bg-cyber-primary/10 rounded w-28"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-cyber-black/30 p-2 rounded backdrop-blur-sm border border-gray-800">
              <div className="h-3 bg-cyber-primary/10 rounded w-8 mb-1"></div>
              <div className="h-4 bg-cyber-primary/20 rounded w-12"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const glowColor = coin.price_change_percentage_24h > 0 ? 'green' : 'primary';
  const isPriceUp = coin.price_change_percentage_24h > 0;

  return (
    <Card 
      glowColor={glowColor}
      className="h-full relative overflow-hidden"
    >
      {/* Data line animation */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyber-secondary to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyber-secondary to-transparent opacity-50"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.5 }}
            className={`${isPriceUp ? 'animate-pulse-green' : 'animate-pulse-pink'} rounded-full overflow-hidden mr-3`}
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="w-10 h-10"
            />
          </motion.div>
          <div>
            <h3 className={`text-lg font-cyber font-semibold ${isGlitching ? 'animate-glitch' : ''}`}>
              {coin.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 uppercase">{coin.symbol}</span>
              <Badge 
                variant={isPriceUp ? 'success' : 'danger'}
              >
                {formatPercent(coin.price_change_percentage_24h)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-xl font-mono font-bold mb-1 ${isPriceUp ? 'text-cyber-green' : 'text-cyber-primary'} ${isGlitching ? 'animate-glitch' : ''}`}>
            {formatPrice(coin.current_price)}
          </div>
          <div className="text-xs text-gray-500">
            Market Cap: {formatMarketCap(coin.market_cap)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-cyber-black/30 p-2 rounded backdrop-blur-sm hover:bg-cyber-black/50 transition-all duration-300 border border-gray-800">
          <div className="text-xs text-gray-500">24h</div>
          <div className={`text-sm font-mono ${priceChangeColor(coin.price_change_percentage_24h)}`}>
            {formatPercent(coin.price_change_percentage_24h)}
          </div>
        </div>
        
        <div className="bg-cyber-black/30 p-2 rounded backdrop-blur-sm hover:bg-cyber-black/50 transition-all duration-300 border border-gray-800">
          <div className="text-xs text-gray-500">7d</div>
          <div className={`text-sm font-mono ${priceChangeColor(coin.price_change_percentage_7d_in_currency)}`}>
            {formatPercent(coin.price_change_percentage_7d_in_currency)}
          </div>
        </div>
        
        <div className="bg-cyber-black/30 p-2 rounded backdrop-blur-sm hover:bg-cyber-black/50 transition-all duration-300 border border-gray-800">
          <div className="text-xs text-gray-500">30d</div>
          <div className={`text-sm font-mono ${priceChangeColor(coin.price_change_percentage_30d_in_currency)}`}>
            {formatPercent(coin.price_change_percentage_30d_in_currency)}
          </div>
        </div>
      </div>
    </Card>
  );
}; 