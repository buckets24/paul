import { Box, Heading, Link, Stack } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import NextLink from 'next/link';
import React, { FC } from 'react';
import TaxOfficeForm from 'src/modules/tax-office/forms/TaxOfficeForm';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

const TaxOfficeCreatePage: FC & HasLayout = () => {
  return (
    <>
      <DashboardHeading
        pt={8}
        px={6}
        minH="168px"
        headerTopContent={
          <Stack direction={['column']}>
            <Box d="flex" flexDirection="column">
              <NextLink passHref href="/einstellungen/finanzamt">
                <Link
                  color="gray.900"
                  d="inline-flex"
                  alignItems="center"
                  fontFamily="heading"
                  fontSize="md"
                  mr={2}
                  _hover={{ textDecor: 'none', color: 'brand.primary.800' }}
                >
                  Finanzamt
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
      <Box pos="relative" p={6} bg="brand.primary.100">
        <TaxOfficeForm />
      </Box>
    </>
  );
};

TaxOfficeCreatePage.getLayout = getEinstellungenLayout;

export default TaxOfficeCreatePage;
