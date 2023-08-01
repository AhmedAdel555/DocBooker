import db from "../database";
import entityAppointment from "../types/entityAppointmentType";
class Booking{

  private static listOfCurrentBookings: Map<string, boolean> = new Map();
  
  public async book_appointment(appointment: entityAppointment, clin_id:string): Promise<string>{
    try{
      Booking.listOfCurrentBookings.set(`${appointment.ent_id}-${appointment.date_of_day}-${appointment.start_time}`, true);
      const connection = await db.connect();
      const result1 = await connection.query(`SELECT status, number_of_patients from entity_appointment WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
      [appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
      console.log(result1);
      if(result1.rows[0].status === 'unavailable'){
        connection.release()
        throw new Error("this appointment not available");
      }
      const result2 = await connection.query(`INSERT INTO booking (clin_id,ent_id,date_of_day,start_time,end_time) 
                                             VALUES ($1, $2,$3,$4,$5)
                                             returning id`, 
      [clin_id , appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
      console.log(result2);
      // if(!(result1.rows[0].number_of_patients > result2.rows[0].count)){

      // }
      const result3 = await connection.query(`UPDATE entity_appointment set status = 'unavailable' WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, [appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
      console.log(result3);
      Booking.listOfCurrentBookings.delete(`${appointment.ent_id}-${appointment.date_of_day}-${appointment.start_time}`);
      connection.release()
      return result2.rows[0].id;
    }
    catch(error){
      Booking.listOfCurrentBookings.delete(`${appointment.ent_id}-${appointment.date_of_day}-${appointment.start_time}`);
      throw new Error((error as Error).message);
    }
  }

  public async cancel_appointment(appoint_id:string, client_id:string){
    try{
      const connection = await db.connect();
      const clint_id = await connection.query('select clin_id from booking where id = $1', [appoint_id]);
      console.log(clint_id.rows[0].clin_id)
      console.log(client_id);
      if(clint_id.rows[0].clin_id === client_id){
        const result = await connection.query('delete from booking where id = $1 returning ent_id,date_of_day,start_time,end_time', [appoint_id]);
        await connection.query(`UPDATE entity_appointment set status = 'available' WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
        [result.rows[0].ent_id, result.rows[0].date_of_day, result.rows[0].start_time, result.rows[0].end_time]);
        connection.release();
      }
      else{
        connection.release();
        throw new Error('not authoried');
      }
    }
    catch(error){
      throw new Error((error as Error).message);
    }
  }  
}
export default Booking;