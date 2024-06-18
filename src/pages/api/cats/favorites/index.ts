import { NextApiRequest, NextApiResponse } from "next"
import GetFavoritesCats from "./index.get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      GetFavoritesCats(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}