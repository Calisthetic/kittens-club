import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetCat(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  const { id } = req.query
  
  try {
    const results:any = await dataService.singleQuery(`SELECT * FROM cats WHERE cat_id = ${id}`);
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}