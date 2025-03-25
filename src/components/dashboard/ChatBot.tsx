import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

const SAMPLE_RESPONSES = [
  "Bitcoin uses a proof-of-work consensus mechanism, while many newer blockchains use proof-of-stake which is more energy efficient.",
  "Ethereum's merge to proof-of-stake reduced its energy consumption by approximately 99.95%.",
  "DeFi (Decentralized Finance) refers to financial services built on blockchain technologies that aim to recreate traditional financial systems without centralized intermediaries.",
  "NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of a specific item, often digital art, collectibles, or virtual real estate.",
  "A blockchain is a distributed, immutable ledger that records transactions across many computers to ensure security and transparency.",
  "Market capitalization is calculated by multiplying the current price of a cryptocurrency by its circulating supply.",
  "Cold storage refers to keeping cryptocurrency offline, away from internet-connected devices, to protect it from hacking attempts.",
];

export const ChatBot = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([
    { type: 'bot', text: 'Hello! I\'m your crypto assistant. Ask me anything about cryptocurrencies, blockchain, or the market!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      const botMessage = { type: 'bot' as const, text: randomResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-cyber-black">
      <div className="border-b border-gray-800 px-4 py-3 flex items-center bg-cyber-dark">
        <h3 className="text-lg font-cyber font-bold text-cyber-accent flex items-center">
          <FaRobot className="text-cyber-secondary mr-2" /> Crypto Assistant
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
          >
            {message.type === 'bot' && (
              <div className="bg-cyber-secondary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-black" />
              </div>
            )}
            
            <div 
              className={`rounded-lg p-3 max-w-[80%] ${
                message.type === 'user' 
                  ? 'bg-cyber-primary/20 border border-cyber-primary text-cyber-accent ml-auto' 
                  : 'bg-cyber-dark border border-cyber-secondary'
              }`}
            >
              {message.text}
            </div>
            
            {message.type === 'user' && (
              <div className="bg-cyber-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="bg-cyber-secondary w-8 h-8 rounded-full flex items-center justify-center">
              <FaRobot className="text-black" />
            </div>
            <div className="flex gap-1">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse delay-100">.</span>
              <span className="animate-pulse delay-200">.</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-800 bg-cyber-dark">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something about crypto..."
            className="flex-1 bg-cyber-black/50 border border-gray-800 rounded-md px-3 py-2 text-cyber-accent placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyber-secondary"
          />
          <Button 
            onClick={handleSendMessage} 
            variant="secondary"
            disabled={!input.trim() || isLoading}
          >
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    </div>
  );
}; 