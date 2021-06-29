import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { isServicePaginatedParams, ServicePaginatedParams } from 'src/modules/common/servicePaginatedParams';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { getUsers, GetUsersResult } from '../services/userService';
import { Prisma } from '.prisma/client';

export type GetUsersHandlerResponse = GetUsersResult;
export type GetUsersHandlerBodyInput = ServicePaginatedParams<
  Omit<Prisma.UserOrderByInput, 'maritalStatusCreatedBy' | 'taxOfficeCreatedBy' | 'funktionCreatedBy'>
>;
const getUsersHandler: RequestHandler<NextApiRequest, NextApiResponse<GetUsersHandlerResponse | SimpleError>> = async (
  req,
  res
) => {
  const body = req.query;

  const params = {
    limit: body.limit ? Number(body.limit) : undefined,
    page: body.page ? Number(body.page) : undefined,
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
    const users = await getUsers(params);

    log(LogLevel.info, 'SUCCESSFULLY_FETCHED_USERS', {
      label: 'GetUserHandler',
      message: 'Users were successfully fetched.',
    });

    res.status(200).json(users);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_FETCHED_USERS_MODEL', {
      label: 'GetUserHandler',
      message: e.message ?? 'Something went wrong when calling getUsers in getUsersHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_FETCHED_USERS_MODEL',
      message: e.message ?? 'Something went wrong when calling getUsers in getUsersHandler',
      errorCode,
    });
  }
};

export default getUsersHandler;
