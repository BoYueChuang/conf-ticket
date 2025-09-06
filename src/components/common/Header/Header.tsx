import React from 'react';
import './Header.scss';

export interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title: _title = 'CONF TICKET' }) => {
  // local storage 裡是否有 token
  const token = localStorage.getItem('token');

  return (
    <>
      <header className="header">
        <img src="/src/assets/images/logo.png" alt="" />
        <p>{token ? '登出' : '前往票券系統'}</p>
      </header>
    </>
  );
};
