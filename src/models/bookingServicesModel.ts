import db from "../database";
import entityAppointment from "../types/entityAppointmentType";
import booking from '../types/bookingType'
abstract class BookingServices{

  protected static listOfCurrentBookings: string[] = [];
  public abstract book(appointment: entityAppointment, clin_id:string): Promise<booking>;
  public async cancel(booking_id:string, client_id:string): Promise<void>{
    try{
      const connection = await db.connect();
      const clint_id = await connection.query('select clin_id from booking where id = $1', [booking_id]);
      if(clint_id.rows[0].clin_id === client_id){
        const deletedBooking = await connection.query('delete from booking where id = $1 returning *', [booking_id]);
        if(deletedBooking.rows.length > 0){
          await connection.query(`UPDATE entity_appointment set status = 'available' WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
          [deletedBooking.rows[0].ent_id, deletedBooking.rows[0].date_of_day, deletedBooking.rows[0].start_time, deletedBooking.rows[0].end_time]);
          connection.release();
        }
        else{
          connection.release();
          throw new Error('this booking not found');
        }
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