import React from 'react';
import './Header.scss';

export interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'CONF TICKET' }) => {
  // 組件邏輯
  return (
    <header className="header">
      <img src="/src/assets/images/logo.png" alt="" />
      <p>前往票券系統</p>
    </header>
  );
};
