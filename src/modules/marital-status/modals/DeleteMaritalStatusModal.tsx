import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';
import queryClient from 'src/utils/queryClient';

import { DeleteMaritalStatusByIdHandlerResponse } from '../handlers/deleteMaritalStatusByIdHandler';
import { DeleteMultipleMaritalStatusHandlerResponse } from '../handlers/deleteMultipleMaritalStatusHandler';
import { maritalStatusToastDeleteMaritalStatusSuccess } from '../maritalStatusMsg';
import { MARITAL_STATUS_QUERY_KEY } from '../query-hooks/maritalStatusQuerykey';
import {
  DeleteMaritalStatusByIdResult,
  DeleteMultipleMaritalStatusByIdsResult,
} from '../services/maritalStatusService';

interface DeleteMaritalStatusModalProps {
  maritalStatus: number | (number | undefined)[] | undefined;
  disclosure: UseDisclosureProps;
  onDelete?: () => void;
}

const DeleteMaritalStatusModal: FC<DeleteMaritalStatusModalProps> = ({ maritalStatus, disclosure, onDelete }) => {
  const toast = useToast();

  const deleteMaritalStatusMutation = useMutation<
    AxiosResponse<DeleteMaritalStatusByIdHandlerResponse>,
    unknown,
    number
  >(
    async (maritalStatusId) => {
      return await axios.delete<DeleteMaritalStatusByIdResult>(`/api/marital-status/${maritalStatusId}`);
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'DELETE_MARITAL_STATUS', {
          label: 'DeleteMaritalStatus',
          message: `Marital status: ${response.data.name} was successfully deleted`,
        });
        toast(maritalStatusToastDeleteMaritalStatusSuccess());
        void queryClient.invalidateQueries(MARITAL_STATUS_QUERY_KEY);
        disclosure.onClose?.();
        onDelete?.();
      },
    }
  );

  const deleteMultipleMaritalStatus = useMutation<
    AxiosResponse<DeleteMultipleMaritalStatusHandlerResponse>,
    unknown,
    (number | undefined)[]
  >(
    async (maritalStatus) => {
      return await axios.delete<DeleteMultipleMaritalStatusByIdsResult>('/api/marital-status', { data: maritalStatus });
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'DELETE_MULTIPLE_MARITAL_STATUS', {
          label: 'DeleteMultipleMaritalStatus',
          message: `${response} marital status were successfully deleted`,
        });

        toast(maritalStatusToastDeleteMaritalStatusSuccess());

        void queryClient.invalidateQueries(MARITAL_STATUS_QUERY_KEY);

        disclosure.onClose?.();

        onDelete?.();
      },
    }
  );

  return (
    <DataTableModal
      {...disclosure}
      header="Familienstand l??schen"
      body={`M??chten Sie den Familienstand wirklich l??schen? Das kann nicht mehr r??ckg??ngig gemacht werden?`}
      confirmText="L??schen"
      onConfirm={() => {
        if (Array.isArray(maritalStatus)) {
          void deleteMultipleMaritalStatus.mutateAsync(maritalStatus);
        } else {
          void deleteMaritalStatusMutation.mutateAsync(Number(maritalStatus));
        }
      }}
    />
  );
};

export default DeleteMaritalStatusModal;
