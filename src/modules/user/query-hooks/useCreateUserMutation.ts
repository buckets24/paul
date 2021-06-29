import { useToast } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import router from 'next/router';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';

import { CreateUserResult } from '../services/userService';
import { userToastCreatingUserSuccess } from '../userMsg';

export type UseCreateUserMutationInput = Prisma.UserCreateInput;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCreateUserMutation = () => {
  const toast = useToast();

  return useMutation<AxiosResponse<CreateUserResult>, unknown, UseCreateUserMutationInput>(
    async (values) => {
      return await axios.post<CreateUserResult>('/api/users', values);
    },
    {
      onSuccess: (response, values) => {
        log(LogLevel.info, 'CREATE_USER', {
          label: 'UserForm',
          message: `User with an id of ${response.data.id} was successfully created`,
        });
        toast(
          userToastCreatingUserSuccess({
            description: `Der Benutzer ${values.firstName} ${values.lastName} wurde erfolgreich erstellt`,
          })
        );

        void router.push('/einstellungen/users');
      },
    }
  );
};

export default useCreateUserMutation;
