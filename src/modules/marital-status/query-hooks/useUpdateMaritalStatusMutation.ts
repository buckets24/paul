import { useToast } from '@chakra-ui/react';
import { MaritalStatus } from '@prisma/client';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation } from 'react-query';
import queryClient from 'src/utils/queryClient';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { SetRequired } from 'type-fest';

import {
  maritalStatusToastUpdatingMaritalStatusErr,
  maritalStatusToastUpdatingMaritalStatusSuccess,
} from '../maritalStatusMsg';
import { UpdateMaritalStatusByIdResult } from '../services/maritalStatusService';
import { MARITAL_STATUS_QUERY_KEY } from './maritalStatusQuerykey';

export type UseUpdateMaritalStatusMutationInput = SetRequired<Partial<MaritalStatus>, 'id'>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUpdateMaritalStatusMutation = () => {
  const toast = useToast();

  return useMutation<
    AxiosResponse<UpdateMaritalStatusByIdResult>,
    AxiosError<SimpleError>,
    UseUpdateMaritalStatusMutationInput
  >(
    async (values: UseUpdateMaritalStatusMutationInput) => {
      return await axios.put<UpdateMaritalStatusByIdResult>(`/api/marital-status/${values.id}`, values);
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'UPDATE_MARITAL_STATUS', {
          label: 'MaritalStatusForm',
          message: `Marital status with an id of ${response.data.id} was successfully updated`,
        });

        toast(maritalStatusToastUpdatingMaritalStatusSuccess());

        // Update item data
        void queryClient.invalidateQueries([MARITAL_STATUS_QUERY_KEY]);
      },
      onError: (error) => {
        if (error.response?.data.errorCode) {
          log(LogLevel.info, 'UPDATE_MARITAL_STATUS_ERROR', {
            label: 'MaritalStatusForm',
            message: error.message,
          });
          toast(maritalStatusToastUpdatingMaritalStatusErr(error.response.data.errorCode));
        }
      },
    }
  );
};

export default useUpdateMaritalStatusMutation;
