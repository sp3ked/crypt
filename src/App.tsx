import { useState, useEffect } from 'react';
import { useCryptoData } from './hooks/useCryptoData';
import { Header } from './components/dashboard/Header';
import { CoinCard } from './components/dashboard/CoinCard';
import { TrendingCoins } from './components/dashboard/TrendingCoins';
import { ChatBot } from './components/dashboard/ChatBot';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

function App() {
  const { topCoins, trendingCoins, globalData, loading, error, refresh } = useCryptoData();

  if (loading && !topCoins.length) {
    return (
      <div className="min-h-screen bg-cyber-black text-cyber-accent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-cyber font-bold mb-4 text-cyber-primary">CRYPTOVERSE</h1>
          <div className="flex space-x-2 justify-center">
            <div className="h-3 w-3 bg-cyber-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-cyber-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-cyber-green rounded-full animate-bounce"></div>
          </div>
          <p className="mt-4 text-cyber-accent font-mono">Loading crypto data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-black text-cyber-accent flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-4xl font-cyber font-bold mb-4 text-cyber-primary">ERROR</h1>
          <p className="mb-6 text-cyber-accent font-mono">{error}</p>
          <Button onClick={refresh} variant="primary">Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-accent flex flex-col">
      <Header globalData={globalData} />
      
      {/* Splitscreen Layout: 75% Crypto Dashboard | 25% Chatbot */}
      <div className="flex flex-grow overflow-hidden">
        {/* Crypto Dashboard - 75% */}
        <div className="w-3/4 overflow-y-auto p-6">
          {/* Top Coins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topCoins.slice(0, 3).map((coin: any) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
          
          {/* Market Overview & Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card title="Crypto Market Overview">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-cyber-dark/50 p-4 rounded-md border border-gray-800">
                    <div className="text-xs text-gray-500 mb-1">Total Market Cap</div>
                    <div className="text-xl font-mono">
                      ${((globalData?.total_market_cap?.usd || 0) / 1e12).toFixed(2)}T
                    </div>
                  </div>
                  <div className="bg-cyber-dark/50 p-4 rounded-md border border-gray-800">
                    <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                    <div className="text-xl font-mono">
                      ${((globalData?.total_volume?.usd || 0) / 1e9).toFixed(2)}B
                    </div>
                  </div>
                </div>
                
                <div className="text-center py-6 text-cyber-secondary font-cyber">
                  CRYPTO MARKET DASHBOARD
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-cyber-dark/50 p-3 rounded-md border border-gray-800 text-center">
                    <div className="text-xs text-gray-500 mb-1">BTC Dominance</div>
                    <div className="font-mono">{(globalData?.market_cap_percentage?.btc || 0).toFixed(1)}%</div>
                  </div>
                  <div className="bg-cyber-dark/50 p-3 rounded-md border border-gray-800 text-center">
                    <div className="text-xs text-gray-500 mb-1">ETH Dominance</div>
                    <div className="font-mono">{(globalData?.market_cap_percentage?.eth || 0).toFixed(1)}%</div>
                  </div>
                  <div className="bg-cyber-dark/50 p-3 rounded-md border border-gray-800 text-center">
                    <div className="text-xs text-gray-500 mb-1">Active Coins</div>
                    <div className="font-mono">{globalData?.active_cryptocurrencies || 0}</div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <TrendingCoins coins={trendingCoins} />
            </div>
          </div>
          
          {/* More Coins */}
          <Card title="Top Performing Coins">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topCoins.slice(3, 11).map((coin: any) => (
                <div key={coin.id} className="flex items-center p-2 border border-gray-800 rounded-md">
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
              ))}
            </div>
          </Card>
        </div>
        
        {/* Chatbot - 25%, filling the entire height */}
        <div className="w-1/4 border-l border-gray-800">
          <div className="h-full">
            <ChatBot />
          </div>
        </div>
      </div>
      
      <footer className="border-t border-gray-800 p-4 text-center text-xs text-gray-600">
        <p>CRYPTOVERSE © {new Date().getFullYear()} | Cyberpunk Crypto Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
