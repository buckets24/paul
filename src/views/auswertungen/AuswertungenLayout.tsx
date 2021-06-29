import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';

import Header from '../common/Header';
import Layout from '../common/Layout';
import AuswertungenSidebar from './AuswertungenSidebar';

const AuswertungenLayout: FC = ({ children }) => (
  <Layout header={<Header />} sidebar={<AuswertungenSidebar />}>
    {children}
  </Layout>
);

export const getAuswertungenLayout: GetLayout = (page) => <AuswertungenLayout>{page}</AuswertungenLayout>;
