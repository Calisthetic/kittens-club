import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostTablesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  const users = [
    {
      user_name: 'admin',
      email: 'admin@gmail.com',
      password: '1234',
    },
    {
      user_name: 'user',
      email: 'user@gmail.com',
      password: '1234',
    }
  ]
  const tag_categories = [
    { tag_category_name: 'emotions' },
    { tag_category_name: 'actions' },
    { tag_category_name: 'events' },
    { tag_category_name: 'adjectives' },
    { tag_category_name: 'others' },
  ]
  const tags = [
    { tag_category_id: 1, tag_name: 'smiling' },
    { tag_category_id: 1, tag_name: 'shocked' },
    { tag_category_id: 1, tag_name: 'scary' },
    { tag_category_id: 1, tag_name: 'confused' },
    { tag_category_id: 1, tag_name: 'angry' },
    { tag_category_id: 1, tag_name: 'agressive' },
    { tag_category_id: 1, tag_name: 'lovely' },
    { tag_category_id: 1, tag_name: 'suspicious' },
    { tag_category_id: 1, tag_name: 'cool' },
    { tag_category_id: 1, tag_name: 'cute' },
    { tag_category_id: 2, tag_name: 'hugs' },
    { tag_category_id: 2, tag_name: 'parkour' },
    { tag_category_id: 2, tag_name: 'play' },
    { tag_category_id: 2, tag_name: 'sleep' },
    { tag_category_id: 2, tag_name: 'sit' },
    { tag_category_id: 2, tag_name: 'lay' },
    { tag_category_id: 2, tag_name: 'stay' },
    { tag_category_id: 2, tag_name: 'cry' },
    { tag_category_id: 2, tag_name: 'eat' },
    { tag_category_id: 2, tag_name: 'lick' },
    { tag_category_id: 3, tag_name: 'March 8' },
    { tag_category_id: 3, tag_name: 'New Year' },
    { tag_category_id: 3, tag_name: 'Paskha' },
    { tag_category_id: 4, tag_name: 'flowers' },
    { tag_category_id: 5, tag_name: 'pow' },
    { tag_category_id: 5, tag_name: 'IT' },
    { tag_category_id: 5, tag_name: 'humor' },
    { tag_category_id: 5, tag_name: 'strange places' },
    { tag_category_id: 5, tag_name: 'strange items' },
    { tag_category_id: 5, tag_name: 'wtf' },
  ]

  try {
    const promises:Promise<any>[] = []
    users.forEach(x => promises.push(dataService.singleQuery(`
      INSERT INTO users (user_name, email, password)
      VALUES ('${x.user_name}', '${x.email}', '${x.password}')
    `)))
    promises.forEach(async (x) => await x)
    promises.splice(0, promises.length);
    
    tag_categories.forEach(x => promises.push(dataService.singleQuery(`
      INSERT INTO tag_categories (tag_category_name)
      VALUES ('${x.tag_category_name}')
    `)))
    promises.forEach(async (x) => await x)
    promises.splice(0, promises.length);
    
    tags.forEach(x => promises.push(dataService.singleQuery(`
      INSERT INTO tags (tag_name, tag_category_id)
      VALUES ('${x.tag_name}', ${x.tag_category_id})
    `)))
    promises.forEach(async (x) => await x)
    promises.splice(0, promises.length);

    return res.json({ message: "Data inserted successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
}