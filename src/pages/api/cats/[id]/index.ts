import { NextApiRequest, NextApiResponse } from "next"
import GetCat from "./index.get";
import DeleteCat from "./index.delete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetCat(req, res)
      break;
    case 'DELETE':
      DeleteCat(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}