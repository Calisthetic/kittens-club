import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"
import fs from 'fs';
import PersistentFile from 'formidable/PersistentFile';
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function PostCats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err:any, fields:any, files:any) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      // Process form fields and files here
      // For demonstration, just sending back fields
      
      if (!files.files.length || files.files.length === 0) {
        return res.status(400).send({message: 'Unable to read files'})
      }

      for (let i = 0; i < files.files.length; i++) {
        const data = fs.readFileSync(files.files[i].filepath);
        await dataService.singleQuery(`
          INSERT INTO cats (user_id, image) VALUES (1, ?)
        `, [data]);
      }

      return res.status(200);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}