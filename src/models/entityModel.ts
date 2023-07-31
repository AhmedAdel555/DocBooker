import entity from '../types/entityType';
import db from "../database";
class Entity{
  public async getEntitiesForDoctor(docId: string): Promise<entity[]>{
    try{
      const connection = await db.connect()
      const sql = `SELECT id,type,price,street_address,city,state FROM entity WHERE doc_id = $1;`
      const result = await connection.query(sql, [docId])
      connection.release()
      return result.rows
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}

export default Entity;