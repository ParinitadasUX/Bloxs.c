
import React from 'react';

interface BadgeProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, children, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-purple-300 border border-white/10 ${className}`}>
      {children || text}
    </span>
  );
};
