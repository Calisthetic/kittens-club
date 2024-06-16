import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetCats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const results:any = await dataService.singleQuery(`
      SELECT cats.cat_id AS id, cat_name AS name, users.user_name FROM cats
      LEFT JOIN users ON users.user_id = cats.user_id WHERE cats.is_private = FALSE
      ORDER BY cats.cat_id DESC
    `);
    // for (let i = 0; i < results.result.length; i++) {
    //   results.result[i].image = Buffer.from(results.result[i].image).toString('base64')
    // }
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}