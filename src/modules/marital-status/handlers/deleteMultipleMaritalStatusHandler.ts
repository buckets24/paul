import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import {
  deleteMultipleMaritalStatusByIds,
  DeleteMultipleMaritalStatusByIdsResult,
} from '../services/maritalStatusService';

export type DeleteMultipleMaritalStatusHandlerResponse = DeleteMultipleMaritalStatusByIdsResult;
const deleteMultipleMaritalStatusHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteMultipleMaritalStatusHandlerResponse | SimpleError>
> = async (req, res) => {
  const { body } = req;

  const maritalStatusIds = body as number[];

  let deletedMaritalStatus: DeleteMultipleMaritalStatusByIdsResult;

  try {
    deletedMaritalStatus = await deleteMultipleMaritalStatusByIds(maritalStatusIds);

    log(LogLevel.info, 'DELETE_MULTIPLE_MARITAL_STATUS', {
      label: 'DeleteMultipleMaritalStatus',
      message: `${deletedMaritalStatus.count} marital status were successfully deleted`,
    });

    res.status(201).json(deletedMaritalStatus);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_DELETE_MULTIPLE_MARITAL_STATUS', {
      label: 'DeleteMultipleMaritalStatus',
      message:
        e.message ??
        'Something went wrong when calling deleteMultipleMaritalStatusByIds in deleteMultipleMaritalStatusHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_DELETE_MULTIPLE_MARITAL_STATUS',
      message:
        e.message ??
        'Something went wrong when calling deleteMultipleMaritalStatusByIds in deleteMultipleMaritalStatusHandler',
      errorCode,
    });
  }
};

export default deleteMultipleMaritalStatusHandler;
