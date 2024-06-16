import { NextApiRequest, NextApiResponse } from "next"
import PatchCatVerify from "./index.patch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PATCH':
      PatchCatVerify(req, res)
      break;
    default:
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}