import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"
import fs from 'fs'
import path from 'path'

export default async function GetCatImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  const { id } = req.query
  
  try {
    const results:any = await dataService.singleQuery(`SELECT image FROM users WHERE user_id = ${id}`);
    if (results.result.length === 0) {
      return res.status(404).send({message: "User not fount"})
    }

    if (!results.result[0].image) {
      const filePath = path.resolve('.', 'public/user.png')
      const imageBuffer = fs.readFileSync(filePath)
      res.setHeader('Content-Type', 'image/png');
      return res.send(imageBuffer)
    }

    res.setHeader('Content-Type', 'image/jpg')
    res.send(Buffer.from(results.result[0].image, 'base64'))
  } catch (error) {
    return res.status(500).send(error);
  }
}