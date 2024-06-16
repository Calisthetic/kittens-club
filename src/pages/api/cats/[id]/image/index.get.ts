import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetCatImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  const { id } = req.query
  
  try {
    const results:any = await dataService.singleQuery(`SELECT image FROM cats WHERE cat_id = ${id}`);
    if (results.result.length === 0) {
      return res.status(404).send({message: "Cat image not fount"})
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(results.result[0].image, 'base64'))
  } catch (error) {
    return res.status(500).send(error);
  }
}