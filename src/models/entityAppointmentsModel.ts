import entityAppointment from "../types/entityAppointmentType";
import db from "../database";
class EntityAppointments{

  public async getAppointmentsForEntity(ent_id:string): Promise<entityAppointment[] | null>{
    try{
      const connection = await db.connect()
      const sql = `SELECT date_of_day,start_time,end_time,status,number_of_patients FROM entity_appointment WHERE ent_id = $1;`
      const result = await connection.query(sql, [ent_id])
      if(result.rows.length > 0){
        connection.release()
        return result.rows
      }
      connection.release()
      return null;
      
    }catch(error){
      throw new Error((error as Error).message);
    }
  }

  
}

export default EntityAppointments;