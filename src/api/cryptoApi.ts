import axios from 'axios';

const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
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

export const fetchTopCoins = async (limit = 10) => {
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