import doctor from "../types/doctorType";
import db from "../database";
class Doctor{

  public async getAllDoctors() : Promise<doctor[]>{
    try{
      const connection = await db.connect()
      const sql = `SELECT id, name, main_specialization, description, gender, rate FROM doctor;`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    }catch(error){
      throw new Error((error as Error).message);
    }
  }

  public async getDoctor(doc_id:string) : Promise<doctor>{
    try{
      const connection = await db.connect()
      const sql = `SELECT id, name, main_specialization, description, gender, rate FROM doctor WHERE id = $1;`
      const result = await connection.query(sql, [doc_id])
      connection.release()
      console.log(result.rows[0])
      return result.rows[0]
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}
export default Doctor;