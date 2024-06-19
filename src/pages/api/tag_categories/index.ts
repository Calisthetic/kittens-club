import { NextApiRequest, NextApiResponse } from "next"
import PostTagCategories from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      PostTagCategories(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}