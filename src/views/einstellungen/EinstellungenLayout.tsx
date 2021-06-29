import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';

import Header from '../common/Header';
import Layout from '../common/Layout';
import EinstellungenSidebar from './EinstellungenSidebar';

const EinstellungenLayout: FC = ({ children }) => {
  return (
    <Layout header={<Header />} sidebar={<EinstellungenSidebar />}>
      {children}
    </Layout>
  );
};

export const getEinstellungenLayout: GetLayout = (page) => <EinstellungenLayout>{page}</EinstellungenLayout>;
