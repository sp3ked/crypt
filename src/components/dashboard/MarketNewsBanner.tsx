import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaNewspaper, FaChartLine, FaSync } from 'react-icons/fa';
import { fetchCryptoNews } from '../../api/cryptoApi';

// Type definition for news items
interface NewsItem {
  id: string;
  type: string;
  text: string;
  url?: string;
  source?: string;
}

// Initial fallback news data
const FALLBACK_NEWS = [
  { id: 'initial-1', type: 'alert', text: 'Loading latest crypto news...' },
  { id: 'initial-2', type: 'update', text: 'Fetching market updates...' },
  { id: 'initial-3', type: 'market', text: 'Syncing with crypto newsfeeds...' },
];

// Pre-generate static data artifacts for decoration
const STATIC_DATA_ARTIFACTS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  opacity: 0.1 + Math.random() * 0.4,
  blinking: Math.random() > 0.7
}));

const getIconForNewsType = (type: string) => {
  switch (type) {
    case 'alert':
      return <FaExclamationTriangle className="text-cyber-primary" />;
    case 'market':
      return <FaChartLine className="text-cyber-green" />;
    default:
      return <FaNewspaper className="text-cyber-accent" />;
  }
};

export const MarketNewsBanner = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch crypto news data
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const newsData = await fetchCryptoNews();
      
      if (newsData && newsData.length > 0) {
        setNewsItems(newsData);
        // Reset to first item when new data arrives
        setCurrentNewsIndex(0);
        // Trigger a glitch effect when new data loads
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 350);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error in news component:', err);
      setError('Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNews();
    
    // Refresh news every 5 minutes
    const refreshInterval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Cycle through news items automatically
  useEffect(() => {
    if (isPaused || newsItems.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
      
      // Random glitch effect
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 350);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused, newsItems.length]);
  
  const currentNews = newsItems[currentNewsIndex] || FALLBACK_NEWS[0];
  
  return (
    <div className="relative w-full overflow-hidden bg-cyber-black border-b border-cyber-primary/50 backdrop-blur-md">
      {/* Background data grid artifacts */}
      <div className="absolute inset-0 pointer-events-none">
        {STATIC_DATA_ARTIFACTS.map(artifact => (
          <div 
            key={artifact.id}
            className={`absolute rounded-full ${artifact.blinking ? 'animate-pulse' : ''}`}
            style={{
              top: artifact.top,
              left: artifact.left,
              width: `${artifact.size}px`,
              height: `${artifact.size}px`,
              opacity: artifact.opacity,
              backgroundColor: '#05d9e8'
            }}
          />
        ))}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-40"></div>
      </div>
      
      {/* Digital noise overlay */}
      <div className={`absolute inset-0 bg-noise opacity-5 pointer-events-none ${isGlitching ? 'opacity-20' : ''}`}></div>
      
      {/* News banner content */}
      <div 
        className="py-1 px-4 flex items-center justify-between relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* News type indicator and controls */}
        <div className="flex items-center gap-2 mr-3 border-r border-cyber-primary/30 pr-3">
          <div className={`${isGlitching ? 'animate-glitch' : ''} text-lg sm:text-xl text-cyber-primary font-cyber flex items-center`}>
            FEED
            {isLoading && <span className="ml-2 text-xs"><FaSync className="animate-spin" /></span>}
          </div>
          <div className="flex space-x-1 items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full ${i === currentNewsIndex % 3 ? 'bg-cyber-primary' : 'bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
        
        {/* News content - animated text */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNews.id}
              className={`flex items-center font-mono text-sm ${isGlitching ? 'animate-glitch' : ''}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`mr-2 ${currentNews.type === 'alert' ? 'text-cyber-primary animate-pulse' : ''}`}>
                {getIconForNewsType(currentNews.type)}
              </span>
              <span className="text-cyber-accent truncate">
                {currentNews.text}
              </span>
              {currentNews.source && (
                <span className="ml-2 text-xs text-gray-500">
                  [SRC: {currentNews.source}]
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* News counter indicator */}
        <div className="ml-3 border-l border-cyber-primary/30 pl-3 flex items-center">
          <div className="text-xs font-mono text-cyber-accent bg-cyber-dark/50 px-1.5 py-0.5 rounded">
            {`${currentNewsIndex + 1}/${newsItems.length}`}
          </div>
        </div>
      </div>
    </div>
  );
}; 