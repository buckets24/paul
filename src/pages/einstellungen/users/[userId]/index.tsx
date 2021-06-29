import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import UserForm from 'src/modules/user/forms/UserForm';
import { GetUserResult } from 'src/modules/user/services/userService';
import { ArrowIcon } from 'src/theme/icons/ArrowIcon';
import { formatDate } from 'src/utils/formatDate';
import Spinner from 'src/views/common/Spinner';
import { getEinstellungenLayout } from 'src/views/einstellungen/EinstellungenLayout';

const UserEditPage: FC & HasLayout = () => {
  const router = useRouter();
  const userId = router.query.userId;

  const { data: user, isLoading } = useQuery(['users', userId], async () => {
    if (userId) {
      const res = await axios.get<GetUserResult>(`/api/users/${userId}`);
      return res.data;
    }
  });

  return (
    <>
      <DashboardHeading
        pt={8}
        px={6}
        minH="168px"
        headerTopContent={
          <>
            <Stack direction={['column', 'column', 'column', 'row']} alignItems="flex-start" justify="space-between">
              <Box d="flex" flexDirection="column">
                <Stack direction="row" alignItems="center" spacing={0}>
                  <NextLink passHref href="/einstellungen/users">
                    <Link
                      color="gray.900"
                      d="inline-flex"
                      alignItems="center"
                      fontFamily="heading"
                      fontSize="md"
                      mr={2}
                      _hover={{ textDecor: 'none', color: 'brand.primary.800' }}
                    >
                      Benutzerverwaltung
                    </Link>
                  </NextLink>
                  <ArrowIcon direction="right" color="gray.800" height="14px" mr={2} />
                  <Text fontSize="md" color="gray.800" mr={2} textTransform="capitalize">
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <ChevronIcon color="gray.900" w="9px" />
                </Stack>
                <Box pb={2}>
                  <Heading as="h2" mb={2} textTransform="capitalize" whiteSpace="nowrap">
                    {user?.firstName} {user?.lastName}
                  </Heading>
                </Box>
              </Box>
              <Box textAlign={['left', 'left', 'left', 'right']}>
                <Text fontSize="md" color="grey.800">
                  Erstellt {formatDate(user?.createdAt.toString() ?? '')} | Hans Schmidtgarten
                </Text>
                <Text fontSize="md" mb={6}>
                  <span color="gray.300">Aktualisiert</span> {formatDate(user?.updatedAt.toString() ?? '')} | Max Müller
                </Text>
              </Box>
            </Stack>
            <Box id="form-actions-container" w="100%" />
          </>
        }
      />
      <Box pos="relative" p={6} bg="brand.primary.100">
        {isLoading ? <Spinner /> : <UserForm user={user} />}
      </Box>
    </>
  );
};

UserEditPage.getLayout = getEinstellungenLayout;

export default UserEditPage;
