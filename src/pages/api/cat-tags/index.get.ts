import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetCatTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const results:any = await dataService.singleQuery(`
      SELECT * FROM tag_categories LEFT JOIN tags ON tag_categories.tag_category_id = tags.tag_id
    `);
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}