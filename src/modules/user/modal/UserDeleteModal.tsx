import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { AxiosResponse } from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { FC } from 'react';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';
import queryClient from 'src/utils/queryClient';

import useDeleteUserMutation from '../query-hooks/useDeleteUserMutation';
import { USERS_QUERY_KEY } from '../query-hooks/usersQueryKeys';
import { DeleteMultipleUsersResult } from '../services/userService';
import { userToastDeleteUserSuccess } from '../userMsg';

interface UserDeleteModalProps {
  user?: Partial<User> | null | undefined;
  multipleUsers?: Partial<User>[] | null | undefined;
  disclosure: UseDisclosureProps;
  onDelete?: () => void;
}

const UserDeleteModal: FC<UserDeleteModalProps> = ({ user, multipleUsers, disclosure, onDelete }) => {
  const toast = useToast();

  const deleteUserMutation = useDeleteUserMutation({
    onSuccess: (response) => {
      log(LogLevel.info, 'DELETE_USER', {
        label: 'DeleteUser',
        message: `User: ${response.data.firstName} ${response.data.lastName} was successfully deleted`,
      });
      toast(userToastDeleteUserSuccess());
      void queryClient.invalidateQueries([USERS_QUERY_KEY]);
      disclosure.onClose?.();
      onDelete?.();
    },
  });

  const deleteMultipleUsers = useMutation<
    AxiosResponse<DeleteMultipleUsersResult>,
    unknown,
    Partial<User>[] | null | undefined
  >(
    async (users) => {
      return await axios.delete('/api/users', { data: users });
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'DELETE_USERS', {
          label: 'DeleteMultipleUsers',
          message: `${response} users were successfully deleted`,
        });
        toast(userToastDeleteUserSuccess());
        void queryClient.invalidateQueries('users');
        disclosure.onClose?.();
        onDelete?.();
      },
    }
  );

  return (
    <DataTableModal
      {...disclosure}
      header="Benutzer löschen"
      body={`Möchten Sie den Benutzer wirklich löschen? Das kann nicht mehr rückgängig gemacht werden?`}
      confirmText="Löschen"
      onConfirm={() =>
        multipleUsers ? deleteMultipleUsers.mutateAsync(multipleUsers) : deleteUserMutation.mutateAsync(user?.id)
      }
    />
  );
};

export default UserDeleteModal;
