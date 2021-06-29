import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { deleteMultipleTaxOfficeByIds, DeleteMultipleTaxOfficesResult } from '../services/taxOfficeService';

export type DeleteMultipleTaxOfficesHandlerResponse = DeleteMultipleTaxOfficesResult;
const deleteMultipleTaxOfficesHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteMultipleTaxOfficesHandlerResponse | SimpleError>
> = async (req, res) => {
  const { body } = req;

  const taxOfficeIds = body as number[];

  let deletedTaxOffice: DeleteMultipleTaxOfficesResult;

  try {
    deletedTaxOffice = await deleteMultipleTaxOfficeByIds(taxOfficeIds);

    log(LogLevel.info, 'DELETE_MULTIPLE_TAX_OFFICES', {
      label: 'DeleteMultipleTaxOffice',
      message: `${deletedTaxOffice.count} marital status were successfully deleted`,
    });

    res.status(201).json(deletedTaxOffice);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_DELETE_MULTIPLE_TAX_OFFICES', {
      label: 'DeleteMultipleTaxOffice',
      message:
        e.message ?? 'Something went wrong when calling deleteMultipleTaxOfficeByIds in deleteMultipleTaxOfficeHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_DELETE_MULTIPLE_TAX_OFFICES',
      message:
        e.message ?? 'Something went wrong when calling deleteMultipleTaxOfficeByIds in deleteMultipleTaxOfficeHandler',
      errorCode,
    });
  }
};

export default deleteMultipleTaxOfficesHandler;
