import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { tag_name, tag_category_id } = req.body
    const results:any = await dataService.singleQuery(`
      INSERT INTO tags (tag_name, tag_category_id) VALUES (?,?)
    `, [tag_name, tag_category_id]);
    
    return res.json({results}.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}