import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface TrendingCoinsProps {
  coins: any[];
}

export const TrendingCoins = ({ coins = [] }: TrendingCoinsProps) => {
  if (!coins.length) {
    return (
      <Card title="Trending Coins" className="h-full">
        <div className="text-center py-8 text-gray-500">
          No trending coins data available
        </div>
      </Card>
    );
  }

  return (
    <Card title="Trending Coins 🔥" className="h-full">
      <div className="space-y-4">
        {coins.slice(0, 5).map((item: any, index: number) => (
          <div key={item.item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-cyber-yellow font-cyber mr-3 text-sm">
                #{index + 1}
              </div>
              <img 
                src={item.item.small} 
                alt={item.item.name}
                className="w-8 h-8 mr-3 rounded-full"
              />
              <div>
                <div className="font-cyber font-semibold">{item.item.name}</div>
                <div className="text-xs text-gray-500 uppercase">{item.item.symbol}</div>
              </div>
            </div>
            
            <div className="text-right">
              <Badge variant="primary" className="mb-1">
                Rank #{item.item.market_cap_rank || 'N/A'}
              </Badge>
              <div className="text-xs text-gray-500">
                Score: {item.item.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}; 