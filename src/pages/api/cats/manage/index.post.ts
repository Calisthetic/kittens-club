import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

type RequestBody = {
  username:string
  offset?:number
}

export default async function GetLikedCats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { offset, username }:RequestBody = req.body
    const results:any = await dataService.singleQuery(`
      SELECT cats.cat_id AS id, cat_name AS name,
      liked_cats.user_id AS liked_by_user_id, favorite_cats.user_id AS favorite_by_user_id FROM cats
      LEFT JOIN users ON users.user_id = cats.user_id
      LEFT JOIN liked_cats ON liked_cats.cat_id = cats.cat_id AND liked_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      LEFT JOIN favorite_cats ON favorite_cats.cat_id = cats.cat_id AND favorite_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      WHERE NOT EXISTS (SELECT 1 FROM tags_of_cats WHERE tags_of_cats.cat_id = cats.cat_id)
      ORDER BY cats.cat_id DESC
      LIMIT 1 ${offset ? `OFFSET ${offset}` : ''}
    `);

    if (results.result.length === 0) {
      return res.status(404).send({message: 'No more cats'})
    }
    return res.json({ results }.results.result[0]);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}