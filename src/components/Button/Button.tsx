import React from 'react';
import { colors } from '@/theme/colorPalette';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {
  const getButtonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles = {
      small: { padding: '8px 16px', fontSize: '14px' },
      medium: { padding: '12px 24px', fontSize: '16px' },
      large: { padding: '16px 32px', fontSize: '18px' },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        color: colors.white,
      },
      secondary: {
        backgroundColor: colors.secondary,
        color: colors.white,
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
      },
    };

    return { ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] };
  };

  return (
    <button style={getButtonStyles()} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
