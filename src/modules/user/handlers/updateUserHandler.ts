import { log, LogLevel, responseErrorWithLogger } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { UserCreateFormFields, userFormYupSchema } from '../schemas/userFormSchema';
import { updateUserById, UpdateUserResult } from '../services/userService';

export type UpdateUserHandlerResponse = UpdateUserResult;
export type UpdateUserHandlerInput = UserCreateFormFields;
export type UpdateUserHandlerQueryParam = Parameters<typeof updateUserById>[0];

const updateUserHandler: RequestHandler<NextApiRequest, NextApiResponse<UpdateUserResult | SimpleError>> = async (
  req,
  res
) => {
  const userId: unknown = req.query.userId;
  const body: unknown = req.body;

  if (!userFormYupSchema.isValidSync(body)) {
    responseErrorWithLogger(res, {
      status: 400,
      type: 'UPDATE_USER_MALFORMED_BODY',
      message: 'The request body sent to the endpoint is incorrect',
    });
    return;
  }

  if (typeof userId !== 'number') {
    responseErrorWithLogger(res, {
      status: 400,
      type: 'UPDATE_USER_MALFORMED_BODY',
      message: 'The request parameter `userId` is not a number',
    });
    return;
  }

  try {
    const updatedUser = await updateUserById(userId, body);

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

export default updateUserHandler;
