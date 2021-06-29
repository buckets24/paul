import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import handler, { RequestHandler } from 'next-connect';
import deleteUserHandler from 'src/modules/user/handlers/deleteUserHandler';
import updateUserHandler from 'src/modules/user/handlers/updateUserHandler';
import { getUserById, GetUserResult } from 'src/modules/user/services/userService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

const getUserHandler: RequestHandler<NextApiRequest, NextApiResponse<GetUserResult | SimpleError>> = async (
  req,
  res
) => {
  const userId = Number(req.query.userId);

  try {
    const user = await getUserById(userId);

    if (!user) {
      const errorCode = log(LogLevel.error, 'USER_DOES_NOT_EXISTS', {
        label: 'GetUserHandler',
        message: 'Could not fetch user. User does not exists.',
      });
      res.status(500).json({
        type: 'USER_DOES_NOT_EXISTS',
        message: 'Could not fetch user. User does not exists.',
        errorCode,
      });
      return;
    }

    log(LogLevel.info, 'SUCCESSFULLY_FETCHED_USER', {
      label: 'GetUserHandler',
      message: 'User was successfully fetched.',
    });

    res.status(200).json(user);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_FETCH_USER_MODEL', {
      label: 'GetUserHandler',
      message: e.message ?? 'Something went wrong when calling deleteUserHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_FETCH_USER_MODEL',
      message: e.message ?? 'Something went wrong when calling deleteUserHandler',
      errorCode,
    });
  }
};

export default handler().get(getUserHandler).delete(deleteUserHandler).put(updateUserHandler);
