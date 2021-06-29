import { useToast } from '@chakra-ui/react';
import { TaxOffice } from '@prisma/client';
import { AxiosError, AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';
import queryClient from 'src/utils/queryClient';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { SetRequired } from 'type-fest';

import { UpdateTaxOfficeByIdResult } from '../services/taxOfficeService';
import { taxOfficeToastUpdatingTaxOfficeErr, taxOfficeToastUpdatingTaxOfficeSuccess } from '../taxOfficeMsg';

export type UseUpdateTaxOfficeMutationValue = AxiosResponse<UpdateTaxOfficeByIdResult>;
export type UseUpdateTaxOfficeMutationError = AxiosError<SimpleError>;
export type UseUpdateTaxOfficeMutationInput = SetRequired<Partial<TaxOffice>, 'id'>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUpdateTaxOfficeMutation = () => {
  const toast = useToast();

  return useMutation<UseUpdateTaxOfficeMutationValue, UseUpdateTaxOfficeMutationError, UseUpdateTaxOfficeMutationInput>(
    async (values: UseUpdateTaxOfficeMutationInput) => {
      return await axios.put<UpdateTaxOfficeByIdResult>(`/api/tax-office/${values.id}`, values);
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'UPDATE_TAX_OFFICE', {
          label: 'TaxOfficeForm',
          message: `Tax office with an id of ${response.data.id} was successfully updated`,
        });

        toast(taxOfficeToastUpdatingTaxOfficeSuccess());

        // Update item data
        void queryClient.invalidateQueries(['tax-office']);
      },
      onError: (error) => {
        if (error.response?.data.errorCode) {
          log(LogLevel.info, 'UPDATE_TAX_OFFICE_ERROR', {
            label: 'TaxOfficeForm',
            message: error.message,
          });
          toast(taxOfficeToastUpdatingTaxOfficeErr(error.response.data.errorCode));
        }
      },
    }
  );
};

export default useUpdateTaxOfficeMutation;
