import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { getMaritalStatusById, GetMaritalStatusByIdResult } from '../services/maritalStatusService';

export type GetMaritalStatusByIdHandlerResponse = GetMaritalStatusByIdResult;

const getMaritalStatusByIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<GetMaritalStatusByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const maritalStatusId = Number(req.query.maritalStatusId);

  try {
    const maritalStatus = await getMaritalStatusById(maritalStatusId);

    if (!maritalStatus) {
      const errorCode = log(LogLevel.error, 'MARITAL_STATUS_DOES_NOT_EXISTS', {
        label: 'GetMaritalStatusByIdHandler',
        message: 'Could not fetch marital status. Marital status does not exists.',
      });
      res.status(500).json({
        type: 'MARITAL_STATUS_DOES_NOT_EXISTS',
        message: 'Could not fetch marital status. Marital status does not exists.',
        errorCode,
      });
      return;
    }

    log(LogLevel.info, 'SUCCESSFULLY_FETCHED_MARITAL_STATUS', {
      label: 'GetMaritalStatusByIdHandler',
      message: 'Marital status was successfully fetched.',
    });

    res.status(200).json(maritalStatus);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_FETCH_MARITAL_STATUS_MODEL', {
      label: 'GetMaritalStatusByIdHandler',
      message: e.message ?? 'Something went wrong when calling getMaritalStatusByIdHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_FETCH_MARITAL_STATUS_MODEL',
      message: e.message ?? 'Something went wrong when calling getMaritalStatusByIdHandler',
      errorCode,
    });
  }
};

export default getMaritalStatusByIdHandler;
