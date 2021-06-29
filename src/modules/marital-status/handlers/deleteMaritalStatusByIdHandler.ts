import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import {
  deleteMaritalStatusById,
  DeleteMaritalStatusByIdResult,
  getMaritalStatusById,
  GetMaritalStatusByIdResult,
} from '../services/maritalStatusService';

export type DeleteMaritalStatusByIdHandlerResponse = DeleteMaritalStatusByIdResult;
const deleteMaritalStatusByIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteMaritalStatusByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const maritalStatusId = Number(req.query.maritalStatusId);

  // Check if marital status exists
  const existingMaritalStatus: GetMaritalStatusByIdResult = await getMaritalStatusById(maritalStatusId);

  if (!existingMaritalStatus) {
    const errorCode = log(LogLevel.error, 'MARITAL_STATUS_DOES_NOT_EXISTS', {
      label: 'DeleteMaritalStatusHandler',
      message: 'Could not delete marital status. Marital status does not exists.',
    });
    res.status(500).json({
      type: 'MARITAL_STATUS_DOES_NOT_EXISTS',
      message: 'Could not delete marital status. Marital status does not exists.',
      errorCode,
    });
    return;
  }

  try {
    const maritalStatus = await deleteMaritalStatusById(maritalStatusId);

    log(LogLevel.info, 'SUCCESSFULLY_DELETED_MARITAL_STATUS', {
      label: 'DeleteMaritalStatusHandler',
      message: 'Marital status was successfully deleted.',
    });

    res.status(201).json(maritalStatus);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_DELETE_MARITAL_STATUS_MODEL', {
      label: 'DeleteMaritalStatusHandler',
      message: e.message ?? 'Something went wrong when calling deleteUserHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_DELETE_MARITAL_STATUS_MODEL',
      message: e.message ?? 'Something went wrong when calling deleteUserHandler',
      errorCode,
    });
  }
};

export default deleteMaritalStatusByIdHandler;
