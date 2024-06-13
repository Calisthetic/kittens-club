import { NextApiRequest, NextApiResponse } from "next"
import GetUsers from "./index.get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetUsers(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}