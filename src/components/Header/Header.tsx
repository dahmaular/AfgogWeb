import React from 'react';
import { colors } from '@/theme/colorPalette';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, rightComponent }) => {
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: colors.white,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const leftSection: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.text,
    margin: 0,
  };

  const backButton: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: colors.primary,
    padding: '4px 8px',
  };

  return (
    <header style={headerStyles}>
      <div style={leftSection}>
        {onBack && (
          <button style={backButton} onClick={onBack}>
            ←
          </button>
        )}
        <h1 style={titleStyles}>{title}</h1>
      </div>
      {rightComponent && <div>{rightComponent}</div>}
    </header>
  );
};
