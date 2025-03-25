import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-cyber inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-cyber-primary text-white hover:bg-cyber-primary/90 border border-cyber-primary shadow-neon-pink',
    secondary: 'bg-cyber-secondary text-black hover:bg-cyber-secondary/90 border border-cyber-secondary shadow-neon',
    outline: 'bg-transparent border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/10',
    ghost: 'bg-transparent hover:bg-cyber-accent/10 text-cyber-accent'
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}; 