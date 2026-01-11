import React from 'react';
import { colors } from '@/theme/colorPalette';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  error,
  fullWidth = true,
  ...props
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
  };

  const inputStyles: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '16px',
    border: `1px solid ${error ? colors.error : colors.border}`,
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.text,
  };

  const errorStyles: React.CSSProperties = {
    fontSize: '12px',
    color: colors.error,
    marginTop: '4px',
  };

  return (
    <div style={containerStyles}>
      {label && <label style={labelStyles}>{label}</label>}
      <input style={inputStyles} {...props} />
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};
