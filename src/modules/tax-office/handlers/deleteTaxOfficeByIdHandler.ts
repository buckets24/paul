import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import {
  deleteTaxOfficeById,
  DeleteTaxOfficeByIdResult,
  getTaxOfficeById,
  GetTaxOfficeByIdResult,
} from '../services/taxOfficeService';

export type DeleteTaxOfficeByIdHandlerResponse = DeleteTaxOfficeByIdResult;
const deleteTaxOfficeByIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteTaxOfficeByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const taxOfficeId = Number(req.query.taxOfficeId);

  // Check if tax office exists
  const existingTaxOffice: GetTaxOfficeByIdResult = await getTaxOfficeById(taxOfficeId);

  if (!existingTaxOffice) {
    const errorCode = log(LogLevel.error, 'TAX_OFFICE_DOES_NOT_EXISTS', {
      label: 'DeleteTaxOfficeHandler',
      message: 'Could not delete tax office. Tax office does not exists.',
    });
    res.status(500).json({
      type: 'TAX_OFFICE_DOES_NOT_EXISTS',
      message: 'Could not delete tax office. Tax office does not exists.',
      errorCode,
    });
    return;
  }

  try {
    const taxOffice = await deleteTaxOfficeById(taxOfficeId);

    log(LogLevel.info, 'SUCCESSFULLY_DELETED_TAX_OFFICE', {
      label: 'DeleteTaxOfficeHandler',
      message: 'Tax office was successfully deleted.',
    });

    res.status(201).json(taxOffice);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_DELETE_TAX_OFFICE_MODEL', {
      label: 'DeleteTaxOfficeHandler',
      message: e.message ?? 'Something went wrong when calling deleteTaxOfficeByIdHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_DELETE_TAX_OFFICE_MODEL',
      message: e.message ?? 'Something went wrong when calling deleteTaxOfficeByIdHandler',
      errorCode,
    });
  }
};

export default deleteTaxOfficeByIdHandler;
