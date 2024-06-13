import { DataService } from '@/lib/data-service';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTablesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataService = new DataService();
  
  try {
    const results:any = await dataService.singleQuery(`
      SELECT table_name, table_rows 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = '${process.env.TIDB_DATABASE}';
    `);
    return res.json({ results }.results.result);
  } catch (error) {
    return res.status(500).send(error);
  }
}