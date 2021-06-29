import { useToast } from '@chakra-ui/toast';
import { AxiosError, AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';
import queryClient from 'src/utils/queryClient';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { UpdateUserHandlerInput, UpdateUserHandlerQueryParam } from '../handlers/updateUserHandler';
import { UpdateUserResult } from '../services/userService';
import { userToastUpdatingUserErr, userToastUpdatingUserSuccess } from '../userMsg';

export type UseUpdateUserMutationInput = { userId: UpdateUserHandlerQueryParam } & UpdateUserHandlerInput;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUpdateUserMutation = () => {
  const toast = useToast();

  return useMutation<AxiosResponse<UpdateUserResult>, AxiosError<SimpleError>, UseUpdateUserMutationInput>(
    async (params: UseUpdateUserMutationInput) => {
      return await axios.put<UpdateUserResult>(`/api/users/${params.userId}`, params);
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'UPDATE_USER', {
          label: 'UserForm',
          message: `User with an id of ${response.data.id} was successfully updated`,
        });

        toast(userToastUpdatingUserSuccess());

        // Update item data
        void queryClient.invalidateQueries(['users']);
      },
      onError: (error) => {
        if (error.response?.data.errorCode) {
          log(LogLevel.info, 'UPDATE_USER_ERROR', {
            label: 'UserForm',
            message: error.message,
          });
          toast(userToastUpdatingUserErr(error.response.data.errorCode));
        }
      },
    }
  );
};

export default useUpdateUserMutation;
