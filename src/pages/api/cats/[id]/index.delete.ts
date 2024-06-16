import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  const { id } = req.query
  
  try {
    const results:any = await dataService.singleQuery(`DELETE * FROM cats WHERE cat_id = ${id}`);
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}