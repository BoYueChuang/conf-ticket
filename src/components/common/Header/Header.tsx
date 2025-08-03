import React from 'react';
import './Header.scss';
import { useHeaderHeight } from '../../../contexts/HeaderHeightContext';

export interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'CONF TICKET' }) => {
  const { headerRef } = useHeaderHeight();

  return (
    <header className="header" ref={headerRef}>
      <img src="/src/assets/images/logo.png" alt="" />
      <p>前往票券系統</p>
    </header>
  );
};