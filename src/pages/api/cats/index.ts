import { NextApiRequest, NextApiResponse } from "next"
import GetCats from "./index.get";
import PostCats from "./index.post";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetCats(req, res)
      break;
    case 'POST':
      PostCats(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}