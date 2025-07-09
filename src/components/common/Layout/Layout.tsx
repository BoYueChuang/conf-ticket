import React from 'react';
import './Layout.scss';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className={`layout ${className}`}>
      {showHeader && <Header />}
      <main className="main">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
