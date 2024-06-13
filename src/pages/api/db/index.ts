import { NextApiRequest, NextApiResponse } from "next"
import GetTables from "./index.get";
import PostTables from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTables(req, res)
      break;
    case 'POST':
      PostTables(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}