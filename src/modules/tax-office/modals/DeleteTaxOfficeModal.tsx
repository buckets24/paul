import { UseDisclosureProps, useToast } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import axios from 'src/utils/axios';
import queryClient from 'src/utils/queryClient';

import { DeleteMultipleTaxOfficesHandlerResponse } from '../handlers/deleteMultipleTaxOfficesHandler';
import { DeleteTaxOfficeByIdHandlerResponse } from '../handlers/deleteTaxOfficeByIdHandler';
import { DeleteMultipleTaxOfficesResult, DeleteTaxOfficeByIdResult } from '../services/taxOfficeService';
import { taxOfficeToastDeleteTaxOfficeSuccess } from '../taxOfficeMsg';

interface DeleteTaxOfficeModalProps {
  taxOffice: number | (number | undefined)[];
  disclosure: UseDisclosureProps;
  onDelete?: () => void;
}

const DeleteTaxOfficeModal: FC<DeleteTaxOfficeModalProps> = ({ taxOffice, disclosure, onDelete }) => {
  const toast = useToast();

  const deleteTaxOfficeMutation = useMutation<AxiosResponse<DeleteTaxOfficeByIdHandlerResponse>, unknown, number>(
    async (taxOfficeId) => {
      return await axios.delete<DeleteTaxOfficeByIdResult>(`/api/tax-office/${taxOfficeId}`);
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'DELETE_TAX_OFFICE', {
          label: 'DeleteTaxOffice',
          message: `Tax office: ${response.data.name} was successfully deleted`,
        });

        toast(taxOfficeToastDeleteTaxOfficeSuccess());

        void queryClient.invalidateQueries('tax-office');

        disclosure.onClose?.();

        onDelete?.();
      },
    }
  );

  const deleteMultipleTaxOffice = useMutation<
    AxiosResponse<DeleteMultipleTaxOfficesHandlerResponse>,
    unknown,
    (number | undefined)[]
  >(
    async (taxOffice) => {
      return await axios.delete<DeleteMultipleTaxOfficesResult>('/api/tax-office', { data: taxOffice });
    },
    {
      onSuccess: (response) => {
        log(LogLevel.info, 'DELETE_MULTIPLE_TAX_OFFICE', {
          label: 'DeleteMultipleTaxOffice',
          message: `${response} tax office were successfully deleted`,
        });

        toast(taxOfficeToastDeleteTaxOfficeSuccess());

        void queryClient.invalidateQueries('tax-office');

        disclosure.onClose?.();

        onDelete?.();
      },
    }
  );

  return (
    <DataTableModal
      {...disclosure}
      header="Finanzamt löschen"
      body={`Möchten Sie den Finanzamt wirklich löschen? Das kann nicht mehr rückgängig gemacht werden?`}
      confirmText="Löschen"
      onConfirm={() => {
        if (Array.isArray(taxOffice)) {
          void deleteMultipleTaxOffice.mutateAsync(taxOffice);
        } else {
          void deleteTaxOfficeMutation.mutateAsync(Number(taxOffice));
        }
      }}
    />
  );
};

export default DeleteTaxOfficeModal;
