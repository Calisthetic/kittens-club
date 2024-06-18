import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

type RequestBody = {
  username:string
  limit:number
  offset:number
  search:string
  tags:number[]
}

export default async function SearchCats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { limit, offset, search, tags, username }:RequestBody = req.body
    const results:any = await dataService.singleQuery(`
      SELECT cats.cat_id AS id, cat_name AS name, users.user_name, 
      liked_cats.user_id AS liked_by_user_id, favorite_cats.user_id AS favorite_by_user_id FROM cats
      LEFT JOIN users ON users.user_id = cats.user_id 
      LEFT JOIN tags_of_cats ON tags_of_cats.cat_id = cats.cat_id
      LEFT JOIN liked_cats ON liked_cats.cat_id = cats.cat_id AND liked_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      LEFT JOIN favorite_cats ON favorite_cats.cat_id = cats.cat_id AND favorite_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      WHERE cats.is_private = FALSE ${search ? `AND cats.cat_name LIKE '%${search}%' ` : ''}
      ${(tags && tags.length > 0) ? tags.map((tag_id) => (` AND tags_of_cats.tag_id = ${tag_id}`)).join(' ') : ''}
      ORDER BY cats.cat_id DESC
      ${limit ? `LIMIT ${limit}` : ''} ${offset ? `OFFSET ${offset}` : ''}
    `);
    return res.json({ results }.results.result);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}