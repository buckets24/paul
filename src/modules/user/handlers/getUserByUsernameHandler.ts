import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import prisma from 'src/utils/prisma';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export type GetUserByUsernameHandlerResponse = boolean;
const getUserByUsernameHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<GetUserByUsernameHandlerResponse | SimpleError>
> = async (req, res) => {
  const usernameExists = await prisma.user.findFirst({
    where: {
      username: typeof req.query.username === 'string' ? req.query.username : undefined,
    },
  });

  if (!usernameExists) {
    res.status(200).json(false);
    return;
  }

  res.status(200).json(true);
};

export default getUserByUsernameHandler;
