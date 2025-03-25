import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'default',
  className = ''
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-gray-800 text-cyber-accent',
    primary: 'bg-cyber-primary/20 text-cyber-primary border-cyber-primary',
    secondary: 'bg-cyber-secondary/20 text-cyber-secondary border-cyber-secondary',
    success: 'bg-cyber-green/20 text-cyber-green border-cyber-green',
    warning: 'bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow',
    danger: 'bg-red-900/20 text-red-500 border-red-500'
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}; 