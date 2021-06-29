import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { FormikContextType } from 'formik';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import PasswordModal from '../modal/PasswordModal';
import UserDeleteModal from '../modal/UserDeleteModal';

export interface UserFormActionProps {
  formikBag: FormikContextType<any> | null;
  isValid: boolean;
  user?: User | null;
}

const UserFormActions: FC<UserFormActionProps> = ({ formikBag, isValid, user }) => {
  const deleteModalDisclosure = useDisclosure();
  const passwordModalDisclosure = useDisclosure();
  const router = useRouter();

  return (
    <Stack
      direction={['column', null, 'row']}
      justifyContent={['flex-start', null, 'flex-end']}
      pos="relative"
      w="100%"
      spacing={[4, null, 3]}
    >
      {user && (
        <>
          <Button
            px="32px"
            maxH="40px"
            bg="support.alert.500"
            color="white"
            borderRadius="4px"
            _hover={{
              bg: 'support.alert.700',
            }}
            onClick={() => deleteModalDisclosure.onOpen()}
          >
            Löschen
          </Button>
          <Button
            px="32px"
            maxH="40px"
            bg="brand.primary.600"
            color="white"
            borderRadius="4px"
            _hover={{
              bg: 'brand.primary.700',
            }}
            onClick={() => passwordModalDisclosure.onOpen()}
          >
            Passwort zurücksetzten
          </Button>
          <Box d={['none', null, 'block']} w="1px" bgColor="gray.400" mx={6} ml="24px !important" />
        </>
      )}
      <Button
        type="submit"
        isLoading={formikBag?.isSubmitting}
        loadingText="Saving"
        px="32px"
        ml="0 !important"
        maxH="40px"
        bg="brand.primary.600"
        color="white"
        borderRadius="4px"
        _hover={{
          bg: 'brand.primary.700',
        }}
        isDisabled={!isValid || formikBag?.status === 'checking-email'}
        onClick={() => formikBag?.handleSubmit()}
      >
        Speichern
      </Button>
      <Button
        variant="outline"
        px="32px"
        maxH="40px"
        borderWidth="1px"
        borderColor="brand.primary.600"
        borderRadius="4px"
        color="brand.primary.600"
        _hover={{
          bg: 'brand.primary.200',
        }}
        onClick={() => formikBag?.resetForm()}
      >
        Änderungen zurücksetzten
      </Button>
      <UserDeleteModal
        user={user}
        disclosure={deleteModalDisclosure}
        onDelete={() => void router.push('/einstellungen/users')}
      />
      {user && <PasswordModal userId={user.id} disclosure={passwordModalDisclosure} />}
    </Stack>
  );
};

export default UserFormActions;
