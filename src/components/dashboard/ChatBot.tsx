import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { FaUser, FaPaperPlane, FaExclamationTriangle, FaTerminal } from 'react-icons/fa';
import { sendChatMessage } from '../../api/chatbotApi';

export const ChatBot = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([
    { type: 'bot', text: 'Terminal ready. System online. Type your query for the /sys/bot interface...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, error]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the backend API
      const reply = await sendChatMessage(input.trim());
      const botMessage = { type: 'bot' as const, text: reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to get response from the chatbot. Please try again.');
      console.error('Chatbot error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - fixed at top */}
      <div className="border-b border-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center bg-cyber-dark">
        <h3 className="text-base sm:text-lg font-cyber font-bold text-cyber-accent flex items-center">
          <FaTerminal className="text-cyber-secondary mr-2" /> /sys/bot
        </h3>
      </div>
      
      {/* Messages area with absolute height calculation to ensure input is visible */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        style={{ height: 'calc(100% - 110px)' }} // Fixed calculation accounting for header and input area
      >
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-2 sm:gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              {message.type === 'bot' && (
                <div className="bg-cyber-secondary w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono">
                  <span className="text-black text-xs sm:text-sm font-bold">{'>'}<span className="animate-pulse">_</span></span>
                </div>
              )}
              
              <div 
                className={`rounded-lg p-2 sm:p-3 max-w-[85%] ${
                  message.type === 'user' 
                    ? 'bg-cyber-primary/20 border border-cyber-primary text-cyber-accent ml-auto' 
                    : 'bg-cyber-dark border border-cyber-secondary'
                }`}
              >
                {message.text}
              </div>
              
              {message.type === 'user' && (
                <div className="bg-cyber-primary w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-white text-sm sm:text-base" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <div className="bg-cyber-secondary w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono">
                <span className="text-black text-xs sm:text-sm font-bold">{'>'}<span className="animate-pulse">_</span></span>
              </div>
              <div className="flex gap-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-100">.</span>
                <span className="animate-pulse delay-200">.</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center gap-2 p-2 sm:p-3 bg-cyber-primary/10 border border-cyber-primary rounded-md">
              <FaExclamationTriangle className="text-cyber-primary text-sm sm:text-base" />
              <span className="text-xs sm:text-sm text-cyber-accent">{error}</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area with fixed position at bottom */}
      <div className="p-2 sm:p-3 border-t border-gray-800 bg-cyber-dark sticky bottom-0 left-0 right-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="$ Enter command..."
            className="flex-1 bg-cyber-black/50 border border-gray-800 rounded-md px-2 sm:px-3 py-2 text-sm text-cyber-accent placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyber-secondary"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            variant="secondary"
            size="sm"
            className="sm:text-base"
            disabled={!input.trim() || isLoading}
          >
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    </div>
  );
}; 