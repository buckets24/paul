import DashboardLayout from 'jexity-app/layout/DashboardLayout';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC, ReactNode } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, header, sidebar }) => {
  return (
    <DashboardLayout
      header={header ?? <Header />}
      sidebar={sidebar ?? <Sidebar />}
      sizeProps={{
        headerHeight: '64px',
        sidebarWidth: '280px',
      }}
    >
      {children}
    </DashboardLayout>
  );
};

export const getLayout: GetLayout = (page: ReactNode) => <Layout>{page}</Layout>;

// noinspection JSUnusedGlobalSymbols
export default Layout;
