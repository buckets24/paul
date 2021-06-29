import { log, LogLevel, responseErrorWithLogger } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { VerifyPasswordYupSchema, verifyPasswordYupSchema } from 'src/modules/common/yupSchemaFields';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { updatePasswordByUserId, UpdatePasswordInput, UpdateUserResult } from '../services/userService';

export type UpdatePasswordHandlerResponse = UpdateUserResult;
export type UpdatePasswordHandlerQueryParam = UpdatePasswordInput[0];
export interface UpdatePasswordHandlerInput extends VerifyPasswordYupSchema {
  password: UpdatePasswordInput[1];
}

const updatePasswordHandler: RequestHandler<NextApiRequest, NextApiResponse<UpdateUserResult | SimpleError>> = async (
  req,
  res
) => {
  const userId: unknown = typeof req.query.userId === 'string' ? parseInt(req.query.userId) : undefined;
  const body: unknown = req.body;

  if (!verifyPasswordYupSchema.isValidSync(body)) {
    responseErrorWithLogger(res, {
      status: 400,
      type: 'UPDATE_PASSWORD_MALFORMED_BODY',
      message: `The request body sent to the endpoint is incorrect: ${updatePasswordHandler.name}`,
    });
    return;
  }

  if (typeof userId !== 'number') {
    responseErrorWithLogger(res, {
      status: 400,
      type: 'UPDATE_PASSWORD_MALFORMED_BODY',
      message: `The request parameter 'userId' is not a number: ${updatePasswordHandler.name}`,
    });
    return;
  }

  try {
    const updatedUser = await updatePasswordByUserId(userId, body.password);

    log(LogLevel.info, 'SUCCESSFULLY_UPDATED_USER', {
      label: 'UpdateUserHandler',
      message: 'User was successfully updated.',
    });

    res.status(200).json(updatedUser);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_UPDATE_USER_MODEL', {
      label: 'UpdateUserHandler',
      message: e.message ?? 'Something went wrong when calling updateUserHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_UPDATE_USER_MODEL',
      message: e.message ?? 'Something went wrong when calling updateUserHandler',
      errorCode,
    });
  }
};

export default updatePasswordHandler;
