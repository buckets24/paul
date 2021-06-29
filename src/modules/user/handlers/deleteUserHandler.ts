import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { deleteUserById, DeleteUserResult, getUserById, GetUserResult } from '../services/userService';

export type DeleteUserHandlerResponse = DeleteUserResult;
const deleteUserHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteUserHandlerResponse | SimpleError>
> = async (req, res) => {
  const userId = Number(req.query.id);

  // Check if user exists
  const existingUser: GetUserResult = await getUserById(userId);

  if (!existingUser) {
    const errorCode = log(LogLevel.error, 'USER_DOES_NOT_EXISTS', {
      label: 'DeleteUserHandler',
      message: 'Could not delete user. User does not exists.',
    });
    res.status(500).json({
      type: 'USER_DOES_NOT_EXISTS',
      message: 'Could not delete user. User does not exists.',
      errorCode,
    });
    return;
  }

  try {
    const user = await deleteUserById(userId);

    log(LogLevel.info, 'SUCCESSFULLY_DELETED_USER', {
      label: 'DeleteUserHandler',
      message: 'User was successfully deleted.',
    });

    res.status(201).json(user);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_DELETE_USER_MODEL', {
      label: 'DeleteUserHandler',
      message: e.message ?? 'Something went wrong when calling deleteUserHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_DELETE_USER_MODEL',
      message: e.message ?? 'Something went wrong when calling deleteUserHandler',
      errorCode,
    });
  }
};

export default deleteUserHandler;
