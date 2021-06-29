import { Prisma } from '@prisma/client';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { UseCreateUserMutationInput } from '../query-hooks/useCreateUserMutation';
import { userFormYupSchema } from '../schemas/userFormSchema';
import { createUser, CreateUserResult, getUserByEmail, GetUserByEmailResult } from '../services/userService';

const createUserHandler: RequestHandler<NextApiRequest, NextApiResponse<CreateUserResult | SimpleError>> = async (
  req,
  res
) => {
  const { body } = req;

  // Verify input body
  if (!(await userFormYupSchema.isValid(body))) {
    const errorCode = log(LogLevel.error, 'INVALID_FORM_INPUT', {
      label: 'CreateUserHandler',
      message: 'The json body sent to the server was incorrect',
    });
    res.status(400).json({
      type: 'INVALID_FORM_INPUT',
      message: 'The json body sent to the server was incorrect',
      errorCode,
    });
    return;
  }

  const data: UseCreateUserMutationInput = { ...body, active: body.active === 'Ja' };

  const createUserModelInput = data as Prisma.UserCreateInput;

  let createdUser: CreateUserResult;

  try {
    // Check if email already exists
    const emailAlreadyExists: GetUserByEmailResult = await getUserByEmail(createUserModelInput.email);

    if (emailAlreadyExists) {
      const errorCode = log(LogLevel.error, 'EMAIL_ALREADY_EXISTS', {
        label: 'UpdateUserHandler',
        message: 'Could not update new user. Email already exists.',
      });
      res.status(500).json({
        type: 'EMAIL_ALREADY_EXISTS',
        message: 'Could not update new user. Email already exists.',
        errorCode,
      });
      return;
    }

    createdUser = await createUser(createUserModelInput);

    log(LogLevel.info, 'SUCCESSFULLY_CREATED_USER', {
      label: 'CreateUserHandler',
      message: 'User was successfully created.',
    });

    res.status(201).json(createdUser);
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_USER_MODEL', {
      label: 'CreateUserHandler',
      message: e.message ?? 'Something went wrong when calling createUser in createUserHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_CREATE_USER_MODEL',
      message: e.message ?? 'Something went wrong when calling createUser in createUserHandler',
      errorCode,
    });
  }
};

export default createUserHandler;
