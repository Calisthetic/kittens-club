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
  "\n      UPDATE cats SET is_public = on, cat_name = '' WHERE id = 60064\n    "
  try {
    const { username, is_public, cat_name, tags }:RequestBody = req.body
    const { id } = req.query
    const results:any = await dataService.singleQuery(`
      UPDATE cats SET is_private = ? ${cat_name.length > 0 ? `, cat_name = '${cat_name}'` : ` `} WHERE cat_id = ${id}
    `, !is_public);

    if (tags.length > 0) {
      await dataService.singleQuery(`
        DELETE FROM tags_of_cats WHERE cat_id = ${id}
      `);
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