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

  // `DROP TABLE IF EXISTS liked_cats;`,
  // `DROP TABLE IF EXISTS elected_cats;`,
  // `DROP TABLE IF EXISTS tags_of_cats;`,
  // `DROP TABLE IF EXISTS tags;`,
  // `DROP TABLE IF EXISTS tag_categories;`,
  // `DROP TABLE IF EXISTS cats;`,
  // `DROP TABLE IF EXISTS users;`,

  try {
    const promises = []
    for (let i = 0; i < users.length; i++) {
      promises.push(dataService.singleQuery(`
        INSERT INTO users (user_name, email, password)
        VALUES ('${users[i].user_name}', '${users[i].email}', '${users[i].password}')  
      `))
    }
    promises.forEach(async (x) => await x)
    promises.splice(0, promises.length);

    return res.json({ message: "Recreated successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
}