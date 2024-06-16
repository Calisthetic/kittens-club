import { NextApiRequest, NextApiResponse } from "next"
import GetUserImage from "./index.get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetUserImage(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}