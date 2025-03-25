import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaFire, FaChartLine, FaExclamation } from 'react-icons/fa';

interface TrendingCoinsProps {
  coins: any[];
  loading?: boolean;
}

export const TrendingCoins = ({ coins, loading = false }: TrendingCoinsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!coins.length) {
    return (
      <Card title="Trending Coins" glowColor="purple" className="h-full relative">
        <div className="text-center py-8 text-gray-500 flex flex-col items-center justify-center h-full">
          <FaExclamation className="text-cyber-purple mb-2 text-lg animate-pulse" />
          <span className="font-cyber text-sm">DATA UNAVAILABLE</span>
          <div className="mt-2 text-xs">Network synchronization required</div>
        </div>
      </Card>
    );
  }

  return (
    <Card title={
      <div className="flex items-center">
        <span>Trending Coins</span>
        <FaFire className="ml-2 text-cyber-primary animate-pulse" />
      </div>
    } 
    glowColor="purple" 
    className="h-full relative overflow-hidden"
    >
      {/* Background scanner effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="space-y-3">
        {loading ? (
          // Loading placeholders
          Array.from({ length: 4 }).map((_, index) => (
            <div key={`loading-trending-${index}`} className="flex items-center p-2 border border-gray-800 rounded-md bg-cyber-dark/80 animate-pulse">
              <div className="w-6 h-6 rounded-full bg-cyber-primary/20 mr-2"></div>
              <div className="flex-1">
                <div className="h-4 bg-cyber-primary/20 rounded w-24 mb-1"></div>
                <div className="h-3 bg-cyber-primary/10 rounded w-12"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-cyber-primary/20 rounded w-10"></div>
              </div>
            </div>
          ))
        ) : (
          coins.slice(0, 4).map((coin: any, index: number) => (
            <div 
              key={coin.item.id} 
              className="flex items-center p-2 border border-gray-800 rounded-md backdrop-blur-sm hover:border-cyber-primary transition-all duration-300 bg-cyber-dark/80"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6 mr-2" />
              <div className="flex-1">
                <div className={`font-cyber text-sm ${hoveredIndex === index ? 'text-cyber-purple' : ''}`}>
                  {coin.item.name}
                </div>
                <div className="text-xs text-gray-500">{coin.item.symbol}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-mono ${hoveredIndex === index ? 'text-cyber-purple' : ''}`}>
                  #{coin.item.market_cap_rank || "N/A"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}; 