import { useToast } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import { AxiosError, AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import router from 'next/router';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { CreateTaxOfficeResult } from '../services/taxOfficeService';
import { taxOfficeToastCreatingTaxOfficeSuccess } from '../taxOfficeMsg';

export type UseCreateTaxOfficeMutationValue = AxiosResponse<CreateTaxOfficeResult>;
export type UseCreateTaxOfficeMutationError = AxiosError<SimpleError>;
export type UseCreateTaxOfficeMutationInput = Prisma.TaxOfficeCreateInput;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCreateTaxOfficeMutation = () => {
  const toast = useToast();

  return useMutation<UseCreateTaxOfficeMutationValue, UseCreateTaxOfficeMutationError, UseCreateTaxOfficeMutationInput>(
    async (values) => {
      return await axios.post<CreateTaxOfficeResult>('/api/tax-office', values);
    },
    {
      onSuccess: (response, values) => {
        log(LogLevel.info, 'CREATE_TAX_OFFICE', {
          label: 'TaxOfficeForm',
          message: `Tax office with an id of ${response.data.id} was successfully created`,
        });
        toast(
          taxOfficeToastCreatingTaxOfficeSuccess({
            description: `Der Finanzamt ${values.name} wurde erfolgreich erstellt`,
          })
        );

        void router.push('/einstellungen/finanzamt');
      },
    }
  );
};

export default useCreateTaxOfficeMutation;
