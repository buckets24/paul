import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';

import Header from '../common/Header';
import Layout from '../common/Layout';
import ToolsSidebar from './ToolsSidebar';

const ToolsLayout: FC = ({ children }) => (
  <Layout header={<Header />} sidebar={<ToolsSidebar />}>
    {children}
  </Layout>
);

export const getToolsLayout: GetLayout = (page) => <ToolsLayout>{page}</ToolsLayout>;
