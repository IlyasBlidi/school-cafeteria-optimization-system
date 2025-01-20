'use client';

import { CardProvider } from '@/Contexts/CardContext';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CardProvider>
      {children}
    </CardProvider>
  );
};

export default Layout;
