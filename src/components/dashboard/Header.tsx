import { motion } from 'framer-motion';
import { FaNetworkWired, FaChartLine, FaServer, FaSkull } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface HeaderProps {
  globalData: any;
}

const CyberText = ({ children, delayFactor = 0 }: { children: string, delayFactor?: number }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100 + delayFactor * 100);
    return () => clearTimeout(timer);
  }, [delayFactor]);
  
  return (
    <span className={`transition-all duration-300 font-cyber ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </span>
  );
};

export const Header = ({ globalData }: HeaderProps) => {
  const [glitchText, setGlitchText] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Trigger glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 300);
    }, 8000);
    
    return () => clearInterval(glitchInterval);
  }, []);

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

  const stats = [
    {
      title: "Market Cap",
      value: formatNumber(globalData?.total_market_cap?.usd || 0),
      icon: <FaChartLine />,
      color: "cyber-secondary"
    },
    {
      title: "24h Volume",
      value: formatNumber(globalData?.total_volume?.usd || 0),
      icon: <FaNetworkWired />,
      color: "cyber-primary"
    },
    {
      title: "BTC Dominance",
      value: formatPercent(globalData?.market_cap_percentage?.btc || 0),
      icon: <FaSkull />,
      color: "cyber-yellow"
    },
    {
      title: "Active Coins",
      value: globalData?.active_cryptocurrencies?.toString() || "0",
      icon: <FaServer />,
      color: "cyber-green"
    }
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-5 md:p-6 mb-4 md:mb-6 border-b border-gray-800 relative backdrop-blur-sm"
    >
      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-primary opacity-70"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center relative">
          {/* Title with glitch effect */}
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-cyber font-bold ${glitchText ? 'animate-glitch' : ''}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-primary to-cyber-accent">
              <CyberText delayFactor={0}>C</CyberText>
              <CyberText delayFactor={1}>R</CyberText>
              <CyberText delayFactor={2}>Y</CyberText>
              <CyberText delayFactor={3}>P</CyberText>
              <CyberText delayFactor={4}>T</CyberText>
            </span>
          </h1>
          
          {/* Pulsing indicator */}
          <div className="absolute -right-2 -top-2 w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
        </div>
        
        {globalData && Object.keys(globalData).length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className={`bg-cyber-dark/80 p-2 sm:p-3 rounded-md border border-gray-800 flex-1 sm:flex-none backdrop-blur-sm relative overflow-hidden ${activeIndex === index ? `border-${stat.color}` : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="absolute -right-1 -top-1 text-xs text-gray-800 font-cyber bg-gradient-to-br from-transparent to-cyber-primary/10 p-2 transform rotate-12">
                  {index + 1}.DAT
                </div>
                <div className="flex items-center gap-2">
                  <div className={`text-${stat.color} text-sm`}>
                    {stat.icon}
                  </div>
                  <div className="text-xs text-gray-500">{stat.title}</div>
                </div>
                <div className={`font-mono text-${stat.color} text-sm sm:text-base font-bold ${glitchText && index === 0 ? 'animate-glitch' : ''}`}>
                  {stat.value}
                </div>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.header>
  );
}; 