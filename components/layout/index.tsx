import React, { FC } from 'react';
import ApplicationBar from '../appbar';
import Footer from '../footer/footer';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ApplicationBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
