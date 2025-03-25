import axios from 'axios';

const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

// News API for crypto news
const newsApi = axios.create({
  baseURL: 'https://crypto-news16.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '9f92e84ff5msh4fc9fe655d74cc5p1fda01jsnae81a88a9b6d',
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
  }
});

export const fetchTrendingCoins = async () => {
  try {
    const response = await coinGeckoApi.get('/search/trending');
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return [];
  }
};

export const fetchTopCoins = async (limit = 50) => {
  try {
    const response = await coinGeckoApi.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h,7d,30d'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    return [];
  }
};

export const fetchGlobalData = async () => {
  try {
    const response = await coinGeckoApi.get('/global');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    return {};
  }
};

export const fetchCoinDetails = async (coinId: string) => {
  try {
    const response = await coinGeckoApi.get(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true,
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching coin details for ${coinId}:`, error);
    return null;
  }
};

export const fetchCryptoNews = async () => {
  try {
    // First try the RapidAPI endpoint
    const response = await newsApi.get('/news/coindesk');
    return response.data.map((item: any, index: number) => ({
      id: `news-${index}-${Date.now()}`,
      type: determineNewsType(item.title || ''),
      text: item.title || 'Crypto news update',
      url: item.url || '#',
      source: 'CoinDesk'
    }));
  } catch (error) {
    console.error('Error fetching crypto news, falling back to backup source:', error);
    
    // Fallback to alternative source if the first one fails
    try {
      const backupResponse = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee0df9c506d5686a9b085ad2c9d1');
      
      return backupResponse.data.Data.map((item: any, index: number) => ({
        id: `news-${index}-${Date.now()}`,
        type: determineNewsType(item.title || ''),
        text: item.title || 'Crypto news update',
        url: item.url || '#',
        source: item.source || 'CryptoCompare'
      }));
    } catch (backupError) {
      console.error('Backup news source also failed:', backupError);
      
      // Return fallback static data if all APIs fail
      return [
        { id: `static-1-${Date.now()}`, type: 'alert', text: 'Market volatility continues as investors eye regulatory developments' },
        { id: `static-2-${Date.now()}`, type: 'market', text: 'Top altcoins show strong performance amid market recovery' },
        { id: `static-3-${Date.now()}`, type: 'update', text: 'New DeFi protocol aims to revolutionize staking rewards' },
      ];
    }
  }
};

// Helper function to determine news type based on title content
function determineNewsType(title: string) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('crash') || 
      lowerTitle.includes('drop') || 
      lowerTitle.includes('fall') || 
      lowerTitle.includes('hack') || 
      lowerTitle.includes('exploit') || 
      lowerTitle.includes('warning') ||
      lowerTitle.includes('sec') ||
      lowerTitle.includes('regulation')) {
    return 'alert';
  }
  
  if (lowerTitle.includes('surge') || 
      lowerTitle.includes('rise') || 
      lowerTitle.includes('bull') || 
      lowerTitle.includes('rally') || 
      lowerTitle.includes('gain') || 
      lowerTitle.includes('market') ||
      lowerTitle.includes('price')) {
    return 'market';
  }
  
  return 'update';
} 