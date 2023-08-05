import db from "../database";
import entityAppointment from "../types/entityAppointmentType";
import booking from '../types/bookingType'
abstract class BookingServices{

  protected static listOfCurrentBookings: string[] = [];
  public abstract book(appointment: entityAppointment, clin_id:string): Promise<booking>;
  public async cancel(appoint_id:string, client_id:string)
  {
    try{
      const connection = await db.connect();
      const clint_id = await connection.query('select clin_id from booking where id = $1', [appoint_id]);
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
  };
}
export default BookingServices;