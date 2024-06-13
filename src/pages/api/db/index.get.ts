import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTables(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const  results :any = await dataService.singleQuery('SHOW TABLES');
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}