import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { maritalStatusFormYupSchema } from '../forms/MaritalStatusFormSchema';
import { UseCreateMaritalStatusInput } from '../query-hooks/useCreateMaritalStatusMutation';
import { createMaritalStatus, CreateMaritalStatusResult } from '../services/maritalStatusService';

export type CreateMaritalStatusHandlerResponse = CreateMaritalStatusResult;
const createMaritalStatusHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<CreateMaritalStatusHandlerResponse | SimpleError>
> = async (req, res) => {
  const { body } = req;

  // Verify input body
  if (!(await maritalStatusFormYupSchema.isValid(body))) {
    const errorCode = log(LogLevel.error, 'INVALID_FORM_INPUT', {
      label: 'MaritalStatusHandler',
      message: 'The json body sent to the server was incorrect',
    });
    res.status(400).json({
      type: 'INVALID_FORM_INPUT',
      message: 'The json body sent to the server was incorrect',
      errorCode,
    });
    return;
  }

  const createMaritalStatusInput: UseCreateMaritalStatusInput = { ...body, active: body.active === 'Ja' };

  let createdMaritalStatus: CreateMaritalStatusResult;

  try {
    createdMaritalStatus = await createMaritalStatus(createMaritalStatusInput);

    log(LogLevel.info, 'SUCCESSFULLY_CREATED_MARITAL_STATUS', {
      label: 'MaritalStatusHandler',
      message: 'Marital status was successfully created.',
    });

    res.status(201).json(createdMaritalStatus);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_MARITAL_STATUS_MODEL', {
      label: 'MaritalStatusHandler',
      message: e.message ?? 'Something went wrong when calling createMaritalStatus in MaritalStatusHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_CREATE_MARITAL_STATUS_MODEL',
      message: e.message ?? 'Something went wrong when calling createMaritalStatus in MaritalStatusHandler',
      errorCode,
    });
  }
};

export default createMaritalStatusHandler;
