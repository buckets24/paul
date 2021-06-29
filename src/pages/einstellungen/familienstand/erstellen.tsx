import { Box, Heading, Link, Stack } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import NextLink from 'next/link';
import React, { FC } from 'react';
import MaritalStatusForm from 'src/modules/marital-status/forms/MaritalStatusForm';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

const ErstellenPage: FC & HasLayout = () => {
  return (
    <Box bg="brand.primary.100" height="100%">
      <DashboardHeading
        pt={8}
        px={6}
        minH="168px"
        headerTopContent={
          <Stack direction={['column']}>
            <Box d="flex" flexDirection="column">
              <NextLink passHref href="/einstellungen/familienstand">
                <Link
                  color="gray.900"
                  d="inline-flex"
                  alignItems="center"
                  fontFamily="heading"
                  fontSize="md"
                  mr={2}
                  _hover={{ textDecor: 'none', color: 'brand.primary.800' }}
                >
                  Familienstand
                </Link>
              </NextLink>
              <Box pb={2}>
                <Heading as="h2" mb={2} textTransform="capitalize" whiteSpace="nowrap">
                  Hinzufügen
                </Heading>
              </Box>
            </Box>
            <Box id="form-actions-container" w="100%" />
          </Stack>
        }
      />
      <Box pos="relative" p={6}>
        <MaritalStatusForm />
      </Box>
    </Box>
  );
};

ErstellenPage.getLayout = getEinstellungenLayout;

export default ErstellenPage;
