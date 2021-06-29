import { Prisma } from '@prisma/client';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { isServicePaginatedParams, ServicePaginatedParams } from 'src/modules/common/servicePaginatedParams';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { getMaritalStatus, GetMaritalStatusResult } from '../services/maritalStatusService';

export type GetMaritalStatusHandlerResponse = GetMaritalStatusResult;
export type GetMaritalStatusHandlerBodyInput = ServicePaginatedParams<
  Omit<Prisma.MaritalStatusOrderByInput, 'updater'>
>;
const getMaritalStatusHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<GetMaritalStatusHandlerResponse | SimpleError>
> = async (req, res) => {
  const body = req.query;
  const params: unknown = {
    limit: Number(body.limit),
    page: Number(body.page),
    q: body.q,
    orderBy: typeof body.orderBy === 'string' ? JSON.parse(body.orderBy) : undefined,
  };

  if (!isServicePaginatedParams(params)) {
    const errorCode = log(LogLevel.info, 'GET_USERS_MALFORMED_QUERY_PARAMS', {
      label: 'GetUserHandler',
      message: `Malformed request query parameter: ${JSON.stringify(params)}`,
    });
    res.status(400).json({
      type: 'GET_USERS_MALFORMED_QUERY_PARAMS',
      message: 'Malformed request query parameter',
      errorCode: errorCode,
    });
    return;
  }

  try {
    const maritalStatus = await getMaritalStatus(params);

    log(LogLevel.info, 'SUCCESSFULLY_FETCHED_MARITAL_STATUS', {
      label: 'GetMaritalStatusHandler',
      message: 'Marital status were successfully fetched.',
    });

    res.status(200).json(maritalStatus);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_FETCHED_MARITAL_STATUS_MODEL', {
      label: 'GetMaritalStatusHandler',
      message: e.message ?? 'Something went wrong when calling getMaritalStatus in getMaritalStatusHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_FETCHED_MARITAL_STATUS_MODEL',
      message: e.message ?? 'Something went wrong when calling getMaritalStatus in getMaritalStatusHandler',
      errorCode,
    });
  }
};

export default getMaritalStatusHandler;
