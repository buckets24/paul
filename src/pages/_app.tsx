import { ChakraProvider } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import React, { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import Fonts from 'src/theme/styles/fonts';
import theme from 'src/theme/theme';

import queryClient from '../utils/queryClient';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { getLayout } = Component as NextComponentType<NextPageContext, any, Record<string, unknown>> & HasLayout;
  return (
    <>
      <Head>
        <title>Paul 2.0</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider session={pageProps.session}>
          <ChakraProvider resetCSS theme={theme}>
            <Fonts />
            {getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
          </ChakraProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
