import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const results:any = await dataService.singleQuery('SELECT * FROM users');
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}