import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PatchCatVerify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    // change later
    const results:any = await dataService.singleQuery('SELECT * FROM cats');
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}