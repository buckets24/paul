import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import MaritalStatusForm from 'src/modules/marital-status/forms/MaritalStatusForm';
import { GetMaritalStatusByIdHandlerResponse } from 'src/modules/marital-status/handlers/getMaritalStatusByIdHandler';
import { MARITAL_STATUS_QUERY_KEY } from 'src/modules/marital-status/query-hooks/maritalStatusQuerykey';
import { ArrowIcon } from 'src/theme/icons/ArrowIcon';
import axios from 'src/utils/axios';
import Spinner from 'src/views/common/Spinner';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

const MaritalStatusEditPage: FC & HasLayout = () => {
  const router = useRouter();
  const maritalStatusId = router.query.maritalStatusId;

  const { data: maritalStatus, isLoading } = useQuery([MARITAL_STATUS_QUERY_KEY, maritalStatusId], async () => {
    if (maritalStatusId) {
      const res = await axios.get<GetMaritalStatusByIdHandlerResponse>(`/api/marital-status/${maritalStatusId}`);
      return res.data;
    }
  });

  return (
    <Box bg="brand.primary.100" height="100%">
      <DashboardHeading
        pt={8}
        px={6}
        minH="168px"
        headerTopContent={
          <>
            <Stack direction={['column', 'column', 'column', 'row']} alignItems="flex-start" justify="space-between">
              <Box d="flex" flexDirection="column">
                <Stack direction="row" alignItems="center" spacing={0}>
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
                      Listenverwaltung
                    </Link>
                  </NextLink>
                  <ArrowIcon direction="right" color="gray.800" height="14px" mr={2} />
                  <Text fontSize="md" color="gray.900" mr={2}>
                    Familienstand
                  </Text>
                  <ChevronIcon color="gray.900" w="9px" mr={2} />
                  <ArrowIcon direction="right" color="gray.800" height="14px" mr={2} />
                  <Text fontSize="md" color="gray.800" mr={2}>
                    {maritalStatus?.name}
                  </Text>
                  <ChevronIcon color="gray.900" w="9px" />
                </Stack>
                <Box pb={2}>
                  <Heading as="h2" mb={2} textTransform="capitalize" whiteSpace="nowrap">
                    {maritalStatus?.name}
                  </Heading>
                </Box>
              </Box>
              <Box textAlign={['left', 'left', 'left', 'right']}>
                <Text fontSize="md">
                  <span color="gray.300">Aktualisiert</span> 12.01.2021, 10:13 | Max Müller
                </Text>
                <Text fontSize="md" color="grey.800" mb={6}>
                  Erstellt 02.12.2020, 14:47 | Hans Schmidtgarten
                </Text>
              </Box>
            </Stack>
            <Box id="form-actions-container" w="100%" />
          </>
        }
      />
      <Box pos="relative" p={6}>
        {isLoading ? <Spinner /> : <MaritalStatusForm maritalStatus={maritalStatus} />}
      </Box>
    </Box>
  );
};

MaritalStatusEditPage.getLayout = getEinstellungenLayout;

export default MaritalStatusEditPage;
