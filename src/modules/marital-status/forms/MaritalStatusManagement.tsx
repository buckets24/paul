import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { MaritalStatus } from '@prisma/client';
import { FormikContextType } from 'formik';
import router from 'next/router';
import React, { FC } from 'react';

import DeleteMaritalStatusModal from '../modals/DeleteMaritalStatusModal';

interface MaritalStatusManagementProps {
  formikBag: FormikContextType<any> | null;
  isValid: boolean;
  maritalStatus?: Partial<MaritalStatus> | null;
}

const MaritalStatusManagement: FC<MaritalStatusManagementProps> = ({ formikBag, isValid, maritalStatus }) => {
  const deleteModalDisclosure = useDisclosure();

  return (
    <Stack
      direction={['column', null, 'row']}
      justifyContent={['flex-start', null, 'flex-end']}
      pos="relative"
      w="100%"
      spacing={[4, null, 3]}
    >
      {maritalStatus && (
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
        isDisabled={!isValid}
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
      {maritalStatus && (
        <DeleteMaritalStatusModal
          disclosure={deleteModalDisclosure}
          maritalStatus={maritalStatus.id}
          onDelete={() => void router.push('/einstellungen/familienstand')}
        />
      )}
    </Stack>
  );
};

export default MaritalStatusManagement;
