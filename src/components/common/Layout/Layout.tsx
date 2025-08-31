import React from 'react';
import './Layout.scss';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showBreadCrumbs?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showBreadCrumbs = false,
  className = '',
}) => {
  return (
    <div className={`layout ${className}`}>
      {showHeader && <Header />}
      {showBreadCrumbs && <BreadCrumbs />}
      <main className={`main ${showBreadCrumbs ? 'with-breadcrumbs' : ''}`}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
