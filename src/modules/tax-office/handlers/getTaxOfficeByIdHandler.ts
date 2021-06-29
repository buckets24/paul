import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { getTaxOfficeById, GetTaxOfficeByIdResult } from '../services/taxOfficeService';

export type GetTaxOfficeByIdHandlerResponse = GetTaxOfficeByIdResult;

const getTaxOfficeByIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<GetTaxOfficeByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const taxOfficeId = Number(req.query.taxOfficeId);

  try {
    const taxOffice = await getTaxOfficeById(taxOfficeId);

    if (!taxOffice) {
      const errorCode = log(LogLevel.error, 'TAX_OFFICE_DOES_NOT_EXISTS', {
        label: 'GetTaxOfficeByIdHandler',
        message: 'Could not fetch tax office. Tax office does not exists.',
      });
      res.status(500).json({
        type: 'TAX_OFFICE_DOES_NOT_EXISTS',
        message: 'Could not fetch tax office. Tax office does not exists.',
        errorCode,
      });
      return;
    }

    log(LogLevel.info, 'SUCCESSFULLY_FETCHED_TAX_OFFICE', {
      label: 'GetTaxOfficeByIdHandler',
      message: 'Tax office was successfully fetched.',
    });

    res.status(200).json(taxOffice);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_FETCH_TAX_OFFICE_MODEL', {
      label: 'GetTaxOfficeByIdHandler',
      message: e.message ?? 'Something went wrong when calling getTaxOfficeByIdHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_FETCH_TAX_OFFICE_MODEL',
      message: e.message ?? 'Something went wrong when calling getTaxOfficeByIdHandler',
      errorCode,
    });
  }
};

export default getTaxOfficeByIdHandler;
