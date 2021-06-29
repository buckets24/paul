import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { DeleteUserResult } from '../services/userService';

export type UseDeleteUserMutationValue = AxiosResponse<DeleteUserResult>;
export type UseDeleteUserMutaionError = AxiosError<SimpleError>;
export type UseDeleteUserMutationInput = number | undefined;

const useDeleteUserMutation = (
  options: UseMutationOptions<UseDeleteUserMutationValue, UseDeleteUserMutaionError, UseDeleteUserMutationInput>
): UseMutationResult<UseDeleteUserMutationValue, UseDeleteUserMutaionError, UseDeleteUserMutationInput> => {
  return useMutation<UseDeleteUserMutationValue, UseDeleteUserMutaionError, UseDeleteUserMutationInput>(
    async (userId) => {
      return await axios.delete<DeleteUserResult>(`/api/users/${userId}`);
    },
    {
      ...options,
    }
  );
};

export default useDeleteUserMutation;
