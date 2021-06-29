import { Box, Grid, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import anylogger from 'anylogger';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React, { FC } from 'react';
import { getLayout } from 'src/views/common/Layout';

const log = anylogger('paul-2.0');

interface HomePageProps {
  session: any;
}

const Home: FC<HomePageProps> & HasLayout = ({ session }) => {
  return (
    <Grid templateColumns={['repeat(1, 1fr)']} gap={5} p={5}>
      <Box p={20}>
        <Heading>Dashboard</Heading>
        <SimpleGrid gridTemplateColumns="max-content" gap={4}>
          <Text>Start page</Text>
        </SimpleGrid>
      </Box>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const session = await getSession(context);
  log.debug('Index: Session', session);

  if (!session) {
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
Home.getLayout = getLayout;
