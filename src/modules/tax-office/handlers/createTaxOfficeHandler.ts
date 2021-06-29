import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { taxOfficeFormFieldsFormYupSchema } from '../forms/TaxOfficeFormSchema';
import { UseCreateTaxOfficeMutationInput } from '../query-hooks/useCreateTaxOfficeMutation';
import { createTaxOffice, CreateTaxOfficeResult } from '../services/taxOfficeService';

export type CreateTaxOfficeHandlerResponse = CreateTaxOfficeResult;
const createTaxOfficeHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<CreateTaxOfficeHandlerResponse | SimpleError>
> = async (req, res) => {
  const { body } = req;

  // Verify input body
  if (!(await taxOfficeFormFieldsFormYupSchema.isValid(body))) {
    const errorCode = log(LogLevel.error, 'INVALID_FORM_INPUT', {
      label: 'TaxOfficeHandler',
      message: 'The json body sent to the server was incorrect',
    });
    res.status(400).json({
      type: 'INVALID_FORM_INPUT',
      message: 'The json body sent to the server was incorrect',
      errorCode,
    });
    return;
  }

  const createTaxOfficeInput: UseCreateTaxOfficeMutationInput = { ...body, active: body.active === 'Ja' };

  let createdTaxOffice: CreateTaxOfficeResult;

  try {
    createdTaxOffice = await createTaxOffice(createTaxOfficeInput);

    log(LogLevel.info, 'SUCCESSFULLY_CREATED_TAX_OFFICE', {
      label: 'TaxOfficeHandler',
      message: 'Tax office was successfully created.',
    });

    res.status(201).json(createdTaxOffice);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_TAX_OFFICE_MODEL', {
      label: 'TaxOfficeHandler',
      message: e.message ?? 'Something went wrong when calling createTaxOffice in TaxOfficeHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_CREATE_TAX_OFFICE_MODEL',
      message: e.message ?? 'Something went wrong when calling createTaxOffice in TaxOfficeHandler',
      errorCode,
    });
  }
};

export default createTaxOfficeHandler;
