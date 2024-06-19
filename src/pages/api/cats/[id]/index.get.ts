import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetCat(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const { id, username } = req.query
    const results:any = await dataService.singleQuery(`
      SELECT cats.cat_id AS id, cats.cat_name AS name, cats.is_private, tags_of_cats.tag_id
      ${username ? `, liked_cats.user_id AS liked_by_user_id, favorite_cats.user_id AS favorite_by_user_id` : ''} FROM cats
      LEFT JOIN tags_of_cats ON tags_of_cats.cat_id = cats.cat_id
      ${username ? `
        LEFT JOIN users ON users.user_id = cats.user_id
        LEFT JOIN liked_cats ON liked_cats.cat_id = cats.cat_id AND liked_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
        LEFT JOIN favorite_cats ON favorite_cats.cat_id = cats.cat_id AND favorite_cats.user_id = (SELECT user_id FROM users WHERE user_name = '${username}')
      ` : ''}
      WHERE cats.cat_id = ${id} ${username ? `AND users.user_name = '${username}'` : ''}
    `);

    const transformedArray:any = [];
    results.result.forEach((item:any) => {
      const existingItem = transformedArray.find((i:any) => i.id === item.id);
      if (existingItem) {
        // Если элемент с таким ID уже существует, добавляем новый тег в массив тегов
        existingItem.tags.push(item.tag_id);
      } else {
        // Иначе создаем новый элемент с массивом тегов
        transformedArray.push({
          ...{
            id: item.id, 
            name: item.name,
            liked_by_user_id: item.liked_by_user_id,
            favorite_by_user_id: item.favorite_by_user_id
          },
          tags: [item.tag_id]
        });
      }
    });
    if (results.result.length === 0) {
      res.status(404).send({message: "Cat not found"})
    }
    return res.json(transformedArray[0]);
  } catch (error) {
    return res.status(500).send(error);
  }
}