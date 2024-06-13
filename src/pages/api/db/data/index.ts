import { NextApiRequest, NextApiResponse } from "next"
import GetTablesData from "./index.get";
import PostTablesData from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTablesData(req, res)
      break;
    case 'POST':
      PostTablesData(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}