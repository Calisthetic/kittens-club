import { NextApiRequest, NextApiResponse } from "next"
import GetTags from "./index.get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTags(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}