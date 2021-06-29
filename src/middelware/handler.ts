import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getHandler() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
  });
}
