import React from 'react';
import { colors } from '@/theme/colorPalette';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, className, onClick }) => {
  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div style={cardStyles} className={className} onClick={onClick}>
      {children}
    </div>
  );
};
