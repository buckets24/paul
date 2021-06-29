import { User } from '@prisma/client';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { DeleteMultipleUsersResult, deleteUsersByIds } from '../services/userService';

export type DeleteUsersHandlerResponse = number | SimpleError;
const deleteMultipleUsersHandler: RequestHandler<NextApiRequest, NextApiResponse<DeleteUsersHandlerResponse>> = async (
  req,
  res
) => {
  const { body } = req;

  const multipleUsersModelInput = body as User[];

  // Get user ids
  const userIds = multipleUsersModelInput.map((user) => user.id);

  let deletedUsers: DeleteMultipleUsersResult;

  try {
    deletedUsers = await deleteUsersByIds(userIds);

    log(LogLevel.info, 'DELETE_USERS', {
      label: 'DeleteMultipleUsers',
      message: `${deletedUsers.count} users were successfully deleted`,
    });

    res.status(201).json(deletedUsers.count);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_DELETE_MULTIPLE_USERS', {
      label: 'DeleteMultipleUsers',
      message: e.message ?? 'Something went wrong when calling deleteUsersByIds in deleteMultipleUsersHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_DELETE_MULTIPLE_USERS',
      message: e.message ?? 'Something went wrong when calling deleteUsersByIds in deleteMultipleUsersHandler',
      errorCode,
    });
  }
};

export default deleteMultipleUsersHandler;
