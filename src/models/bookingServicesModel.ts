import db from "../database";
import entityAppointment from "../types/entityAppointmentType";
import booking from '../types/bookingType'
abstract class BookingServices{

  protected static listOfCurrentBookings: string[] = [];
  public abstract book(appointment: entityAppointment, clin_id:string): Promise<booking>;
  public async cancel(appoint_id:string, client_id:string): Promise<booking>{
    try{
      const connection = await db.connect();
      const clint_id = await connection.query('select clin_id from booking where id = $1', [appoint_id]);
      if(clint_id.rows[0].clin_id === client_id){
        const deletedBooking = await connection.query('delete from booking where id = $1 returning *', [appoint_id]);
        await connection.query(`UPDATE entity_appointment set status = 'available' WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
        [deletedBooking.rows[0].ent_id, deletedBooking.rows[0].date_of_day, deletedBooking.rows[0].start_time, deletedBooking.rows[0].end_time]);
        connection.release();
        return deletedBooking.rows[0];
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