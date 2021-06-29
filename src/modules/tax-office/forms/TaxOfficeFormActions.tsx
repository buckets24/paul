import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { TaxOffice } from '@prisma/client';
import { FormikContextType } from 'formik';
import router from 'next/router';
import React, { FC } from 'react';

import DeleteTaxOfficeModal from '../modals/DeleteTaxOfficeModal';

interface TaxOfficeManagementProps {
  formikBag: FormikContextType<any> | null;
  isValid: boolean;
  taxOffice?: TaxOffice | null;
}

const TaxOfficeFormActions: FC<TaxOfficeManagementProps> = ({ formikBag, isValid, taxOffice }) => {
  const deleteModalDisclosure = useDisclosure();

  return (
    <Stack
      direction={['column', null, 'row']}
      justifyContent={['flex-start', null, 'flex-end']}
      pos="relative"
      w="100%"
      spacing={[4, null, 3]}
    >
      {taxOffice && (
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
      {taxOffice && (
        <DeleteTaxOfficeModal
          taxOffice={taxOffice.id}
          disclosure={deleteModalDisclosure}
          onDelete={() => void router.push('/einstellungen/finanzamt')}
        />
      )}
    </Stack>
  );
};

export default TaxOfficeFormActions;
