import doctor from "../types/doctorType";
import subSpecialization from "../types/subSpecializationType";
import db from "../database";
class Doctor{

  public async getDoctors() : Promise<doctor[]>{
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

  public async getDoctor(doc_id:string) : Promise<(doctor&subSpecialization[]) | (null) >{
    try{
      const connection = await db.connect()
      const sql = `SELECT id, name, main_specialization, description, gender, rate FROM doctor WHERE id = $1;`
      const doctors = await connection.query(sql, [doc_id])
      if(doctors.rows.length > 0){
        const sql2 = ` select sub_specialization from doc_sub_specializations where doc_id = $1;`
        const subSpecializations = await connection.query(sql2, doctors.rows[0].id)
        connection.release()
        return {...doctors.rows[0], subSpecializations: subSpecializations.rows} 
      }
      else{
        connection.release();
        return null;
      }
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}
export default Doctor;