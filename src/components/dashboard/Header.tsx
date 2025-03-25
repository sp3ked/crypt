import { motion } from 'framer-motion';
import { FaNetworkWired, FaChartLine, FaServer, FaSkull, FaBitcoin, FaEthereum, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { SiDogecoin, SiLitecoin, SiChainlink, SiPolkadot, SiBinance } from 'react-icons/si';
import { useState, useEffect, useRef } from 'react';

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

// Price Tickers data with mock prices
const priceTickers = [
  { 
    id: 'bitcoin', 
    name: 'BTC', 
    price: 63842.12, 
    change: 2.34, 
    icon: <FaBitcoin className="text-yellow-500" />,
    color: 'text-yellow-500'
  },
  { 
    id: 'ethereum', 
    name: 'ETH', 
    price: 3487.65, 
    change: -1.27, 
    icon: <FaEthereum className="text-purple-400" />,
    color: 'text-purple-400'
  },
  { 
    id: 'binance', 
    name: 'BNB', 
    price: 568.32, 
    change: 0.87, 
    icon: <SiBinance className="text-yellow-400" />,
    color: 'text-yellow-400'
  },
  { 
    id: 'dogecoin', 
    name: 'DOGE', 
    price: 0.124, 
    change: 5.67, 
    icon: <SiDogecoin className="text-yellow-300" />,
    color: 'text-yellow-300'
  },
  { 
    id: 'litecoin', 
    name: 'LTC', 
    price: 95.72, 
    change: -0.34, 
    icon: <SiLitecoin className="text-gray-400" />,
    color: 'text-gray-400'
  },
  { 
    id: 'chainlink', 
    name: 'LINK', 
    price: 15.23, 
    change: 3.42, 
    icon: <SiChainlink className="text-blue-400" />,
    color: 'text-blue-400'
  },
  { 
    id: 'polkadot', 
    name: 'DOT', 
    price: 7.86, 
    change: -2.18, 
    icon: <SiPolkadot className="text-pink-500" />,
    color: 'text-pink-500'
  },
  { 
    id: 'solana', 
    name: 'SOL', 
    price: 138.92, 
    change: 7.21, 
    icon: <div className="text-purple-600">SOL</div>,
    color: 'text-purple-600'
  },
  { 
    id: 'cardano', 
    name: 'ADA', 
    price: 0.452, 
    change: -0.98, 
    icon: <div className="text-blue-500">ADA</div>,
    color: 'text-blue-500'
  },
  { 
    id: 'avalanche', 
    name: 'AVAX', 
    price: 34.71, 
    change: 1.23, 
    icon: <div className="text-red-500">AVAX</div>,
    color: 'text-red-500'
  }
];

export const Header = ({ globalData }: HeaderProps) => {
  const [glitchText, setGlitchText] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [glitchPrice, setGlitchPrice] = useState<string | null>(null);
  const [marketSentiment, setMarketSentiment] = useState({
    score: Math.floor(Math.random() * 100),
    label: 'NEUTRAL'
  });
  const tickerRef = useRef<HTMLDivElement>(null);
  
  // Trigger glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 300);
    }, 8000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Update market sentiment randomly
  useEffect(() => {
    const updateSentiment = () => {
      const newScore = Math.min(100, Math.max(0, marketSentiment.score + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5)));
      let newLabel = 'NEUTRAL';
      
      if (newScore >= 75) newLabel = 'EXTREME GREED';
      else if (newScore >= 60) newLabel = 'GREED';
      else if (newScore > 40) newLabel = 'NEUTRAL';
      else if (newScore > 25) newLabel = 'FEAR';
      else newLabel = 'EXTREME FEAR';
      
      setMarketSentiment({
        score: newScore,
        label: newLabel
      });
    };
    
    const sentimentInterval = setInterval(updateSentiment, 5000);
    return () => clearInterval(sentimentInterval);
  }, [marketSentiment.score]);
  
  // Trigger random price glitch effects
  useEffect(() => {
    const randomGlitch = () => {
      const randomCoin = priceTickers[Math.floor(Math.random() * priceTickers.length)].id;
      setGlitchPrice(randomCoin);
      setTimeout(() => setGlitchPrice(null), 500);
    };
    
    const glitchInterval = setInterval(randomGlitch, 3000);
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

  const getSentimentColor = (score: number) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 60) return 'text-cyber-green';
    if (score > 40) return 'text-cyber-yellow';
    if (score > 25) return 'text-cyber-primary';
    return 'text-red-600';
  };

  const getSentimentBg = (score: number) => {
    if (score >= 75) return 'from-green-500/20 to-green-600/20';
    if (score >= 60) return 'from-cyber-green/20 to-cyber-green/20';
    if (score > 40) return 'from-cyber-yellow/20 to-cyber-yellow/20';
    if (score > 25) return 'from-cyber-primary/20 to-cyber-primary/20';
    return 'from-red-500/20 to-red-600/20';
  };

  return (
    <div className="border-b border-gray-800 bg-black">
      {/* Top Header Row with Logo, Market Condition, and Stats */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-2 relative backdrop-blur-sm"
      >
        <div className="flex justify-between items-center">
          {/* Left Side: Logo only */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center relative">
              <h1 className={`text-2xl font-cyber font-bold ${glitchText ? 'animate-glitch' : ''}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-primary to-cyber-accent">
                  <CyberText delayFactor={0}>C</CyberText>
                  <CyberText delayFactor={1}>R</CyberText>
                  <CyberText delayFactor={2}>Y</CyberText>
                  <CyberText delayFactor={3}>P</CyberText>
                  <CyberText delayFactor={4}>T</CyberText>
                </span>
              </h1>
              <div className="absolute -right-2 -top-2 w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Center: Market Condition Indicator */}
          <div className="px-6 py-0 bg-black border-t border-b border-l border-r border-gray-800 rounded-sm w-[500px] h-[48px] flex flex-col justify-center mx-auto">
            <div className="text-center leading-tight">
              <div className="text-xs uppercase text-gray-400 font-mono tracking-wider">Market Condition</div>
              <div className={`text-lg font-cyber font-bold ${getSentimentColor(marketSentiment.score)} ${glitchText ? 'animate-glitch' : ''}`}>
                {marketSentiment.label}
              </div>
            </div>
            <div className="flex justify-between text-xs mt-0.5">
              <span className="text-red-500 font-semibold">FEAR</span>
              <span className={`${marketSentiment.score > 40 && marketSentiment.score < 60 ? 'text-cyber-yellow' : 'text-gray-500'} font-semibold`}>NEUTRAL</span>
              <span className="text-green-500 font-semibold">GREED</span>
            </div>
          </div>
          
          {/* Right Side: Stats */}
          {globalData && Object.keys(globalData).length > 0 && (
            <div className="flex items-center gap-2">
              <div className="bg-black px-2 py-1 rounded-sm border border-cyber-secondary/30">
                <div className="text-xs text-cyber-secondary font-mono">Market Cap</div>
                <div className="text-sm font-mono text-white font-bold">
                  {formatNumber(globalData?.total_market_cap?.usd || 0)}
                </div>
              </div>
              
              <div className="bg-black px-2 py-1 rounded-sm border border-cyber-primary/30">
                <div className="text-xs text-cyber-primary font-mono">24h Volume</div>
                <div className="text-sm font-mono text-white font-bold">
                  {formatNumber(globalData?.total_volume?.usd || 0)}
                </div>
              </div>
              
              <div className="bg-black px-2 py-1 rounded-sm border border-cyber-yellow/30">
                <div className="text-xs text-cyber-yellow font-mono">BTC Dominance</div>
                <div className="text-sm font-mono text-white font-bold">
                  {formatPercent(globalData?.market_cap_percentage?.btc || 0)}
                </div>
              </div>
              
              <div className="bg-black px-2 py-1 rounded-sm border border-cyber-green/30">
                <div className="text-xs text-cyber-green font-mono">Active Coins</div>
                <div className="text-sm font-mono text-white font-bold">
                  {globalData?.active_cryptocurrencies?.toString() || "0"}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Crypto Price Ticker - Bottom section of header */}
      <div className="relative bg-cyber-dark/30 border-t border-gray-800 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cyber-black/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cyber-black/80 to-transparent z-10"></div>
        
        <div 
          ref={tickerRef}
          className="py-1 flex items-center gap-6 overflow-x-auto hide-scrollbar animate-marquee"
          style={{ width: 'max-content' }}
        >
          {/* Loop ticker items twice to create seamless loop */}
          {[...priceTickers, ...priceTickers].map((ticker, index) => (
            <div 
              key={`${ticker.id}-${index}`} 
              className={`flex items-center px-3 ${glitchPrice === ticker.id ? 'animate-glitch' : ''}`}
            >
              <div className="flex items-center mr-1.5">
                <div className="mr-1.5">{ticker.icon}</div>
                <div className="font-cyber text-sm">{ticker.name}</div>
              </div>
              <div className="font-mono text-xs font-medium text-cyber-accent">
                ${ticker.price.toLocaleString()}
              </div>
              <div className={`flex items-center ml-1.5 text-xs ${ticker.change >= 0 ? 'text-cyber-green' : 'text-cyber-primary'}`}>
                {ticker.change >= 0 ? (
                  <FaArrowUp className="mr-0.5 text-[10px]" />
                ) : (
                  <FaArrowDown className="mr-0.5 text-[10px]" />
                )}
                {Math.abs(ticker.change)}%
              </div>
              <div className="ml-1.5 text-gray-600">|</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 