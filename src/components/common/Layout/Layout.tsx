import React from 'react';
import './Layout.scss';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { useHeaderHeight } from '../../../contexts/HeaderHeightContext';

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
  const { headerHeight } = useHeaderHeight();

  return (
    <div className={`layout ${className}`}>
      {showHeader && <Header />}
      <main
        className="main"
        style={{
          paddingTop: showHeader ? `${headerHeight}px` : 0
        }}
      >
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};