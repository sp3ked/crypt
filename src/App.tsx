import { useState, useEffect, useMemo } from 'react';
import { useCryptoData } from './hooks/useCryptoData';
import { Header } from './components/dashboard/Header';
import { CoinCard } from './components/dashboard/CoinCard';
import { TrendingCoins } from './components/dashboard/TrendingCoins';
import { ChatBot } from './components/dashboard/ChatBot';
import { MarketNewsBanner } from './components/dashboard/MarketNewsBanner';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { motion } from 'framer-motion';

// Generate the city data once to prevent regeneration on re-render
const generateCityData = () => {
  const buildings = Array.from({ length: 80 }).map(() => {
    const height = 60 + Math.random() * 300;
    const width = 12 + Math.random() * 24;
    const hasTower = Math.random() > 0.6;
    const hasAntenna = Math.random() > 0.75;
    const towerHeight = hasTower ? 20 + Math.random() * 60 : 0;
    const antennaHeight = hasAntenna ? 15 + Math.random() * 30 : 0;
    const windowCount = Math.floor(height / 40);
    
    // Pre-generate window positions
    const windows = Array.from({ length: windowCount }).map(() => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
      opacity: Math.random() * 0.5 + 0.2
    }));
    
    return {
      height,
      width,
      hasTower,
      hasAntenna,
      towerHeight,
      antennaHeight,
      windows
    };
  });
  
  // Pre-generate car traffic data
  const rightCars = Array.from({ length: 3 }).map((_, i) => ({
    delay: `${i * 2}s`,
    duration: `${15 + Math.random() * 10}s`
  }));
  
  const leftCars = Array.from({ length: 3 }).map((_, i) => ({
    delay: `${i * 3 + 1}s`,
    duration: `${18 + Math.random() * 8}s`
  }));
  
  return { buildings, rightCars, leftCars };
};

// Static city data
const CITY_DATA = generateCityData();

// Night City Skyline effect (extracted and memoized)
const NightCitySkyline = () => {
  // Use pre-generated building data
  const { buildings, rightCars, leftCars } = CITY_DATA;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 backdrop-filter backdrop-blur-[0.5px]">
      {/* City skyline silhouette - Buildings of various heights */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh] flex items-end">
        {/* Render pre-generated buildings */}
        {buildings.map((building, index) => (
          <div 
            key={index} 
            className="relative inline-block"
            style={{ width: `${building.width}px` }}
          >
            {/* Main building */}
            <div 
              className="bg-cyber-dark border-t border-cyber-primary/30 absolute bottom-0"
              style={{ 
                height: `${building.height}px`, 
                width: '100%',
              }}
            >
              {/* Building windows - lit up squares */}
              {building.windows.map((window, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-cyber-accent"
                  style={{ 
                    left: window.left, 
                    top: window.top,
                    opacity: window.opacity
                  }}
                />
              ))}
            </div>
            
            {/* Tower on top of building */}
            {building.hasTower && (
              <div 
                className="bg-cyber-dark border-t border-cyber-primary/30 absolute"
                style={{ 
                  height: `${building.towerHeight}px`, 
                  width: '30%',
                  bottom: `${building.height}px`,
                  left: '35%'
                }}
              />
            )}
            
            {/* Antenna */}
            {building.hasAntenna && (
              <div 
                className="bg-cyber-accent/50 absolute w-px"
                style={{ 
                  height: `${building.antennaHeight}px`, 
                  bottom: `${building.height + building.towerHeight}px`,
                  left: '50%'
                }}
              >
                <div className="w-1 h-1 rounded-full bg-cyber-accent/70 absolute -top-1 -left-px" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Horizontal grid lines for "street" effect */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-cyber-primary/40"></div>
      <div className="absolute bottom-10 left-0 h-px w-full bg-cyber-secondary/20"></div>
      <div className="absolute bottom-24 left-0 h-px w-full bg-cyber-secondary/10"></div>
      
      {/* Car traffic lights */}
      <div className="absolute bottom-4 left-0 w-full overflow-hidden">
        {/* Cars going right - red tail lights */}
        {rightCars.map((car, i) => (
          <div 
            key={`car-right-${i}`}
            className="absolute bottom-0 animate-car-lights"
            style={{ 
              animationDelay: car.delay,
              animationDuration: car.duration
            }}
          >
            <div className="flex space-x-10 sm:space-x-20 md:space-x-40">
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyber-primary rounded-full opacity-80" />
                  <div className="w-1 h-1 bg-cyber-primary rounded-full opacity-80" />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Cars going left - white headlights */}
        {leftCars.map((car, i) => (
          <div 
            key={`car-left-${i}`}
            className="absolute bottom-8 animate-car-lights"
            style={{ 
              animationDelay: car.delay,
              animationDuration: car.duration
            }}
          >
            <div className="flex space-x-16 sm:space-x-24 md:space-x-36">
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyber-accent rounded-full opacity-90" />
                  <div className="w-1 h-1 bg-cyber-accent rounded-full opacity-90" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Scan line effect
const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5 z-0">
    <div className="h-px w-full bg-cyber-accent animate-scan-line"></div>
  </div>
);

function App() {
  const { topCoins, trendingCoins, globalData, loading, error, refresh } = useCryptoData();
  const [glitchText, setGlitchText] = useState(false);

  // Periodic glitch animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 300);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-black text-cyber-accent flex items-center justify-center relative overflow-hidden">
        <NightCitySkyline />
        <ScanLine />
        <div className="text-center p-8 max-w-md z-10 relative">
          <motion.h1 
            className="text-4xl font-cyber font-bold mb-4 text-cyber-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="animate-glitch">ERROR</span>
          </motion.h1>
          <motion.p 
            className="mb-6 text-cyber-accent font-mono border border-cyber-primary p-4 bg-cyber-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {error}
          </motion.p>
          <Button onClick={refresh} variant="primary">Reconnect</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-cyber-black bg-night-city text-cyber-accent flex flex-col relative overflow-hidden">
      <NightCitySkyline />
      <ScanLine />
      
      <div className="relative z-10">
        <Header globalData={globalData || {}} />
      </div>
      
      {/* Main Content Area - Takes remaining height */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Crypto Dashboard */}
        <div className="w-full lg:w-3/4 overflow-y-auto p-4 lg:p-6 backdrop-blur-sm bg-cyber-black/20">
          {/* Top Coins */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading || topCoins.length === 0 ? (
              // Loading placeholders using CoinCard
              Array.from({ length: 3 }).map((_, index) => (
                <CoinCard key={`loading-coin-${index}`} loading={true} index={index} />
              ))
            ) : (
              topCoins.slice(0, 3).map((coin: any, index: number) => (
                <CoinCard key={coin.id} coin={coin} index={index} />
              ))
            )}
          </motion.div>
          
          {/* Market Overview & Top Performers */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="lg:col-span-2">
              <Card title="Crypto Market Overview" glowColor="secondary">
                {loading ? (
                  // Loading placeholder for market overview
                  <div className="animate-pulse">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4">
                      <div className="bg-cyber-dark/80 p-3 lg:p-4 rounded-md border border-gray-800">
                        <div className="h-3 w-24 bg-cyber-primary/20 rounded mb-2"></div>
                        <div className="h-6 w-20 bg-cyber-primary/20 rounded"></div>
                      </div>
                      <div className="bg-cyber-dark/80 p-3 lg:p-4 rounded-md border border-gray-800">
                        <div className="h-3 w-24 bg-cyber-primary/20 rounded mb-2"></div>
                        <div className="h-6 w-20 bg-cyber-primary/20 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="text-center py-4 lg:py-6 border-y border-gray-800 my-4">
                      <div className="h-6 w-48 bg-cyber-primary/20 rounded mx-auto"></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 lg:gap-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-cyber-dark/80 p-2 lg:p-3 rounded-md border border-gray-800 text-center">
                          <div className="h-3 w-16 bg-cyber-primary/20 rounded mb-2 mx-auto"></div>
                          <div className="h-5 w-10 bg-cyber-primary/20 rounded mx-auto"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4">
                      <div className="bg-cyber-dark/80 p-3 lg:p-4 rounded-md border border-gray-800 backdrop-blur-sm hover:border-cyber-secondary transition-all duration-300">
                        <div className="text-xs text-gray-500 mb-1">Total Market Cap</div>
                        <div className="text-xl font-mono text-cyber-accent">
                          ${((globalData?.total_market_cap?.usd || 0) / 1e12).toFixed(2)}T
                        </div>
                      </div>
                      <div className="bg-cyber-dark/80 p-3 lg:p-4 rounded-md border border-gray-800 backdrop-blur-sm hover:border-cyber-primary transition-all duration-300">
                        <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                        <div className="text-xl font-mono text-cyber-accent">
                          ${((globalData?.total_volume?.usd || 0) / 1e9).toFixed(2)}B
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center py-4 lg:py-6 text-cyber-secondary font-cyber text-lg border-y border-gray-800 my-4">
                      <span className={`${glitchText ? 'animate-glitch' : ''}`}>CRYPT MARKET DASHBOARD</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 lg:gap-4">
                      <div className="bg-cyber-dark/80 p-2 lg:p-3 rounded-md border border-gray-800 text-center backdrop-blur-sm hover:border-cyber-secondary transition-all duration-300">
                        <div className="text-xs text-gray-500 mb-1">BTC Dominance</div>
                        <div className="font-mono text-cyber-yellow">{(globalData?.market_cap_percentage?.btc || 0).toFixed(1)}%</div>
                      </div>
                      <div className="bg-cyber-dark/80 p-2 lg:p-3 rounded-md border border-gray-800 text-center backdrop-blur-sm hover:border-cyber-secondary transition-all duration-300">
                        <div className="text-xs text-gray-500 mb-1">ETH Dominance</div>
                        <div className="font-mono text-cyber-purple">{(globalData?.market_cap_percentage?.eth || 0).toFixed(1)}%</div>
                      </div>
                      <div className="bg-cyber-dark/80 p-2 lg:p-3 rounded-md border border-gray-800 text-center backdrop-blur-sm hover:border-cyber-secondary transition-all duration-300">
                        <div className="text-xs text-gray-500 mb-1">Active Coins</div>
                        <div className="font-mono text-cyber-green">{globalData?.active_cryptocurrencies || 0}</div>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </div>
            
            <div>
              <TrendingCoins coins={loading ? [] : trendingCoins} loading={loading} />
            </div>
          </motion.div>
          
          {/* More Coins */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card title="Top Performing Coins" glowColor="primary">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {loading || topCoins.length < 3 ? (
                  // Loading placeholders for more coins
                  Array.from({ length: 8 }).map((_, index) => (
                    <div key={`loading-more-coin-${index}`} className="flex items-center p-2 border border-gray-800 rounded-md bg-cyber-dark/80 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-cyber-primary/20 mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-cyber-primary/20 rounded w-16 mb-1"></div>
                        <div className="h-3 bg-cyber-primary/10 rounded w-10"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-cyber-primary/20 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-cyber-primary/10 rounded w-8"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  topCoins.slice(3, 11).map((coin: any) => (
                    <div key={coin.id} className="flex items-center p-2 border border-gray-800 rounded-md backdrop-blur-sm hover:border-cyber-primary transition-all duration-300 bg-cyber-dark/80">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                      <div className="flex-1">
                        <h3 className="font-cyber">{coin.name}</h3>
                        <div className="text-xs text-gray-500">{coin.symbol.toUpperCase()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">${coin.current_price.toLocaleString()}</div>
                        <div className={`text-xs ${coin.price_change_percentage_24h > 0 ? 'text-cyber-green' : 'text-cyber-primary'}`}>
                          {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Chatbot - Fixed size that works well for web app */}
        <motion.div 
          className="w-full h-96 lg:h-auto lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col overflow-hidden bg-cyber-dark/30 backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ChatBot />
        </motion.div>
      </div>
      
      {/* News Feed Banner - Now at the bottom */}
      <div className="relative z-10 mt-auto border-t border-cyber-primary/30">
        <MarketNewsBanner />
      </div>
    </div>
  );
}

export default App;
