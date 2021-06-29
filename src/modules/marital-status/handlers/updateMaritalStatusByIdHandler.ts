import { MaritalStatus } from '@prisma/client';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { UseUpdateMaritalStatusMutationInput } from '../query-hooks/useUpdateMaritalStatusMutation';
import { updateMaritalStatusById, UpdateMaritalStatusByIdResult } from '../services/maritalStatusService';

export type UpdateMaritalStatusByIdHandlerResponse = UpdateMaritalStatusByIdResult;

const updateMaritalStatusByIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<UpdateMaritalStatusByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const { body } = req;

  if (Number(req.query.maritalStatusId) !== body.id) {
    res
      .status(400)
      .json({ type: 'UPDATE_MARITAL_STATUS_WRONG_INPUT', message: 'Query id does not match entity ID', errorCode: '' });
  }

  const active: boolean = body.active === 'Ja' || body.active === true ? true : false;

  const data: UseUpdateMaritalStatusMutationInput = { ...body, active };

  const updateMaritalStatusModelInput = data as MaritalStatus;

  let maritalStatus: UpdateMaritalStatusByIdResult;

  try {
    maritalStatus = await updateMaritalStatusById(updateMaritalStatusModelInput);

    log(LogLevel.info, 'SUCCESSFULLY_UPDATED_MARITAL_STATUS', {
      label: 'UpdateMaritalStatusHandler',
      message: 'Marital status was successfully updated.',
    });

    res.status(200).json(maritalStatus);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_UPDATE_MARITAL_STATUS_MODEL', {
      label: 'UpdateMaritalStatusHandler',
      message: e.message ?? 'Something went wrong when calling updateMaritalStatusByIdHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_UPDATE_MARITAL_STATUS_MODEL',
      message: e.message ?? 'Something went wrong when calling updateMaritalStatusByIdHandler',
      errorCode,
    });
  }
};

export default updateMaritalStatusByIdHandler;
