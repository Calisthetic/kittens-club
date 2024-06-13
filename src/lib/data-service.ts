import { FieldPacket, QueryError, QueryResult } from "mysql2";
import { getConnection } from "./tidb";

export class DataService {
  pool

  constructor() {
    this.pool = getConnection();
  }

  singleQuery(sql:string, ...args:any) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, ...args, (err: QueryError | null, result: QueryResult, fields: FieldPacket[]) => {
        if (err) {
          reject(err);
        } else {
          resolve({ result, fields });
        }
      });
    });
  }

  async close() {
    return new Promise<void>((resolve, reject) => {
      this.pool.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}