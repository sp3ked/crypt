import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'green' | 'purple';
}

export const Card = ({ title, children, className = '', glowColor = 'secondary' }: CardProps) => {
  const glowMap = {
    primary: 'shadow-neon-pink',
    secondary: 'shadow-neon',
    green: 'shadow-neon-green',
    purple: 'shadow-neon-purple'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-cyber-dark border border-${
        glowColor === 'primary' ? 'cyber-primary' : 
        glowColor === 'secondary' ? 'cyber-secondary' : 
        glowColor === 'purple' ? 'cyber-purple' :
        'cyber-green'
      } ${glowMap[glowColor]} rounded-lg overflow-hidden ${className}`}
    >
      {title && (
        <div className="border-b border-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center">
          <h3 className="text-base sm:text-lg font-cyber font-bold text-cyber-accent">{title}</h3>
        </div>
      )}
      <div className="p-3 sm:p-4">
        {children}
      </div>
    </motion.div>
  );
}; 