import { NextApiRequest, NextApiResponse } from "next"
import GetManageCats from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      GetManageCats(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}