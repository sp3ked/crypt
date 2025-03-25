import { useState, useEffect } from 'react';
import { fetchTopCoins, fetchGlobalData, fetchTrendingCoins } from '../api/cryptoApi';

interface GlobalData {
  total_market_cap?: { usd: number };
  total_volume?: { usd: number };
  market_cap_percentage?: { btc: number; eth: number };
  active_cryptocurrencies?: number;
}

export const useCryptoData = () => {
  const [topCoins, setTopCoins] = useState<any[]>([]);
  const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [topCoinsData, globalDataResponse, trendingCoinsData] = await Promise.all([
        fetchTopCoins(10),
        fetchGlobalData(),
        fetchTrendingCoins()
      ]);
      
      if (topCoinsData.length > 0) setTopCoins(topCoinsData);
      if (Object.keys(globalDataResponse).length > 0) setGlobalData(globalDataResponse);
      if (trendingCoinsData.length > 0) setTrendingCoins(trendingCoinsData);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch crypto data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(loadData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    topCoins,
    trendingCoins,
    globalData,
    loading,
    error,
    refresh: loadData
  };
}; 