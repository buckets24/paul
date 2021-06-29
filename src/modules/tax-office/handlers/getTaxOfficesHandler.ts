import { Prisma } from '@prisma/client';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { isServicePaginatedParams, ServicePaginatedParams } from 'src/modules/common/servicePaginatedParams';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { getTaxOffices, GetTaxOfficesResult } from '../services/taxOfficeService';

export type GetTaxOfficeHandlerResponse = GetTaxOfficesResult;
export type GetTaxOfficeHandlerBodyInput = ServicePaginatedParams<
  Omit<Prisma.TaxOfficeOrderByInput, 'updater' | 'creator'>
>;
const getTaxOfficeHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<GetTaxOfficeHandlerResponse | SimpleError>
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
    const users = await getTaxOffices(params);

    log(LogLevel.info, 'SUCCESSFULLY_FETCHED_TAX_OFFICES', {
      label: 'GetTaxOfficesHandler',
      message: 'Tax offices were successfully fetched.',
    });

    res.status(200).json(users);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_FETCHED_TAX_OFFICES_MODEL', {
      label: 'GetTaxOfficesHandler',
      message: e.message ?? 'Something went wrong when calling getTaxOffices in getTaxOfficeHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_FETCHED_TAX_OFFICES_MODEL',
      message: e.message ?? 'Something went wrong when calling getTaxOffices in getTaxOfficeHandler',
      errorCode,
    });
  }
};

export default getTaxOfficeHandler;
