import { useToast } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import router from 'next/router';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';

import { maritalStatusToastCreatingMaritalStatusSuccess } from '../maritalStatusMsg';
import { CreateMaritalStatusResult } from '../services/maritalStatusService';

export type UseCreateMaritalStatusInput = Omit<Prisma.MaritalStatusCreateInput, 'creator'>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCreateMaritalStatusMutation = () => {
  const toast = useToast();

  return useMutation<AxiosResponse<CreateMaritalStatusResult>, unknown, UseCreateMaritalStatusInput>(
    async (values) => {
      return await axios.post<CreateMaritalStatusResult>('/api/marital-status', values);
    },
    {
      onSuccess: (response, values) => {
        log(LogLevel.info, 'CREATE_USER', {
          label: 'MaritalStatusForm',
          message: `Marital status with an id of ${response.data.id} was successfully created`,
        });
        toast(
          maritalStatusToastCreatingMaritalStatusSuccess({
            description: `Der Familienstand ${values.name} wurde erfolgreich erstellt`,
          })
        );

        void router.push('/einstellungen/familienstand');
      },
    }
  );
};

export default useCreateMaritalStatusMutation;
