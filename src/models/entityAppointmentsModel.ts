import entityAppointment from "../types/entityAppointmentType";
import db from "../database";
class Entity_Appointments{
  public async getAppointmentsForEntity(ent_id:string): Promise<entityAppointment[]>{
    try{
      const connection = await db.connect()
      const sql = `SELECT date_of_day,start_time,end_time,status FROM entity_appointment WHERE ent_id = $1;`
      const result = await connection.query(sql, [ent_id])
      connection.release()
      return result.rows
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}

export default Entity_Appointments;