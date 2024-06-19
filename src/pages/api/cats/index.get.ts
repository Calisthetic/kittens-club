import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetCats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { limit, offset, username } = req.query
    const results:any = await dataService.singleQuery(`
      SELECT cats.cat_id AS id, cats.cat_name AS name, users.user_name, 
      liked_cats.user_id AS liked_by_user_id, favorite_cats.user_id AS favorite_by_user_id FROM cats
      LEFT JOIN users ON users.user_id = cats.user_id 
      LEFT JOIN liked_cats ON liked_cats.cat_id = cats.cat_id AND liked_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      LEFT JOIN favorite_cats ON favorite_cats.cat_id = cats.cat_id AND favorite_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      WHERE ${username ? ` users.user_name = '${username}'` : ' cats.is_private = FALSE'}
      ORDER BY cats.cat_id DESC
      ${limit ? `LIMIT ${limit}` : ''} ${offset ? `OFFSET ${offset}` : ''}
    `);
    // git base64 string from blob
    // for (let i = 0; i < results.result.length; i++) {
    //   results.result[i].image = Buffer.from(results.result[i].image).toString('base64')
    // }
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}