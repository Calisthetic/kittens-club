import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

type RequestBody = {
  username:string
  is_public:boolean
  cat_name:string
  tags:number[]
}

export default async function PatchManageCats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { username, is_public, cat_name, tags }:RequestBody = req.body
    const { id } = req.query
    console.log(cat_name)
    const user_results:any = await dataService.singleQuery(`
      SELECT users.user_id FROM users WHERE user_name = ? 
    `, [username]);
    if (user_results.result.length === 0) {
      return res.status(400).send({message: 'User not found'})
    }
    const results:any = await dataService.singleQuery(`
      UPDATE cats SET is_private = ?, cat_name = ? 
      WHERE cat_id = ${id} AND user_id = ${user_results.result[0].user_id}
    `, [!is_public, cat_name]);

    if (tags && tags.length >= 0) {
      await dataService.singleQuery(`
        DELETE FROM tags_of_cats WHERE cat_id = ${id}
      `);
    }
    if (tags.length > 0 && tags[0] !== null) {
      for (let i = 0; i < tags.length; i++) {
        await dataService.singleQuery(`
          INSERT INTO tags_of_cats (cat_id, tag_id) VALUES (${id}, ${tags[i]})
        `);
      }
    }

    return res.json({ results }.results.result);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}