import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostTagCategories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { tag_category_name } = req.body
    const results:any = await dataService.singleQuery(`
      INSERT INTO tag_categories (tag_category_name) VALUES (?)
    `, [tag_category_name]);
    
    return res.json({results}.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}