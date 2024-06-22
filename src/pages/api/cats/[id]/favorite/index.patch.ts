import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PatchCatFavorite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const dataService = new DataService();
  const { username } = req.body
  
  try {
    let userResult:any = await dataService.singleQuery(`
      SELECT users.user_id 
      FROM users
      WHERE users.user_name = ?
    `, [username]);
    if (userResult.result.length === 0) {
      res.status(404).send({message: "User not fount"})
    }
    const userId = userResult.result[0].user_id
    
    let results:any = await dataService.singleQuery(`
      SELECT users.user_id 
      FROM favorite_cats 
      LEFT JOIN users ON users.user_id = favorite_cats.user_id
      WHERE cat_id = ${id} AND user_name = ?
    `, [username]);
    if (results.result.length === 0) {
      results = await dataService.singleQuery(`INSERT INTO favorite_cats (cat_id, user_id) VALUES (${id}, ${userId});`)
    } else {
      results = await dataService.singleQuery(`DELETE FROM favorite_cats WHERE cat_id = ${id} AND user_id = ${userId};`)
    }
    return res.json({ results }.results.result);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}