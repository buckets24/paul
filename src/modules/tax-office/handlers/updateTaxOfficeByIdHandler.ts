import { TaxOffice } from '@prisma/client';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { UseUpdateTaxOfficeMutationInput } from '../query-hooks/useUpdateTaxOfficeMutation';
import { updateTaxOfficeById, UpdateTaxOfficeByIdResult } from '../services/taxOfficeService';

export type UpdateTaxOfficeByIdHandlerResponse = UpdateTaxOfficeByIdResult;
const updateTaxOfficeByIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<UpdateTaxOfficeByIdResult | SimpleError>
> = async (req, res) => {
  const { body } = req;

  if (Number(req.query.taxOfficeId) !== body.id) {
    res
      .status(400)
      .json({ type: 'UPDATE_TAX_OFFICE_WRONG_INPUT', message: 'Query id does not match entity ID', errorCode: '' });
  }

  const active: boolean = body.active === 'Ja' || body.active === true ? true : false;

  const data: UseUpdateTaxOfficeMutationInput = { ...body, active };

  const updateTaxOfficeMutationInput = data as TaxOffice;

  let taxOffice: UpdateTaxOfficeByIdResult;

  try {
    taxOffice = await updateTaxOfficeById(updateTaxOfficeMutationInput);

    log(LogLevel.info, 'SUCCESSFULLY_UPDATED_TAX_OFFICE', {
      label: 'UpdateTaxOfficeByIdHandler',
      message: 'Tax office was successfully updated.',
    });

    res.status(200).json(taxOffice);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_UPDATE_TAX_OFFICE_MODEL', {
      label: 'UpdateTaxOfficeByIdHandler',
      message: e.message ?? 'Something went wrong when calling updateTaxOfficeByIdHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_UPDATE_TAX_OFFICE_MODEL',
      message: e.message ?? 'Something went wrong when calling updateTaxOfficeByIdHandler',
      errorCode,
    });
  }
};

export default updateTaxOfficeByIdHandler;
