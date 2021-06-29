import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';

import Header from '../common/Header';
import Layout from '../common/Layout';
import DocumentsSidebar from './DocumentsSidebar';

const DocumentsLayout: FC = ({ children }) => {
  return (
    <Layout header={<Header />} sidebar={<DocumentsSidebar />}>
      {children}
    </Layout>
  );
};

export const getDocumentsLayout: GetLayout = (page) => <DocumentsLayout>{page}</DocumentsLayout>;

export default DocumentsLayout;
