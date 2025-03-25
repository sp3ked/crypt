import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

interface CoinCardProps {
  coin: any;
}

export const CoinCard = ({ coin }: CoinCardProps) => {
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

  return (
    <Card 
      glowColor={coin.price_change_percentage_24h > 0 ? 'green' : 'primary'}
      className="h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-10 h-10 mr-3"
          />
          <div>
            <h3 className="text-lg font-cyber font-semibold">{coin.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 uppercase">{coin.symbol}</span>
              <Badge 
                variant={coin.price_change_percentage_24h > 0 ? 'success' : 'danger'}
              >
                {formatPercent(coin.price_change_percentage_24h)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-mono font-bold mb-1">
            {formatPrice(coin.current_price)}
          </div>
          <div className="text-xs text-gray-500">
            Market Cap: {formatMarketCap(coin.market_cap)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-cyber-black/30 p-2 rounded">
          <div className="text-xs text-gray-500">24h</div>
          <div className={`text-sm font-mono ${priceChangeColor(coin.price_change_percentage_24h)}`}>
            {formatPercent(coin.price_change_percentage_24h)}
          </div>
        </div>
        
        <div className="bg-cyber-black/30 p-2 rounded">
          <div className="text-xs text-gray-500">7d</div>
          <div className={`text-sm font-mono ${priceChangeColor(coin.price_change_percentage_7d_in_currency)}`}>
            {formatPercent(coin.price_change_percentage_7d_in_currency)}
          </div>
        </div>
        
        <div className="bg-cyber-black/30 p-2 rounded">
          <div className="text-xs text-gray-500">30d</div>
          <div className={`text-sm font-mono ${priceChangeColor(coin.price_change_percentage_30d_in_currency)}`}>
            {formatPercent(coin.price_change_percentage_30d_in_currency)}
          </div>
        </div>
      </div>
    </Card>
  );
}; 