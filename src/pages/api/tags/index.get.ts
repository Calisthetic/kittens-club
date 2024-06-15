import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const results:any = await dataService.singleQuery('SELECT * FROM tags');
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}