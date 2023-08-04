import entity from '../types/entityType';
import db from "../database";
class DoctorEntities{

  public async getEntitiesForDoctor(docId: string): Promise<entity[] | null>{
    try{
      const connection = await db.connect()
      const sql = `SELECT id,type,price,street_address,city,state FROM entity WHERE doc_id = $1;`
      const result = await connection.query(sql, [docId])
      if(result.rows.length > 0){
        connection.release()
        return result.rows
      }
      connection.release()
      return null
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}

export default DoctorEntities;