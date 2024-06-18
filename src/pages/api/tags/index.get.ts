import { DataService } from '@/lib/data-service';
import groupBy from '@/lib/group-by';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const results:any = await dataService.singleQuery(`
      SELECT * FROM tag_categories LEFT JOIN tags ON tag_categories.tag_category_id = tags.tag_category_id
    `);
    
    return res.json(groupBy(results.result, "tag_category_name"));
  } catch (error) {
    return res.status(500).send(error);
  }
}