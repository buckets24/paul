import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import prisma from 'src/utils/prisma';

export default handler<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const emailExists = await prisma.user.findFirst({
    where: {
      email: typeof req.query.email === 'string' ? req.query.email : undefined,
    },
  });

  if (!emailExists) {
    res.status(200).json(false);
    return;
  }

  res.status(200).json(true);
});
