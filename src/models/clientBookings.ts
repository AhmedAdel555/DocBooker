import db from "../database";

class ClientBookings{
    public async getClientBooking(clin_id: string){
      const connection = await db.connect();
      const listOfBooking = await connection.query(`select booking.id , name , street_address, city, state, date_of_day, start_time, end_time 
      from booking join entity on booking.ent_id = entity.id join doctor on entity.doc_id = doctor.id
      where booking.clin_id = $1;`, [clin_id]);
      connection.release();
      if(listOfBooking.rows.length > 0){
        return listOfBooking.rows;
      }
      return null;
    }
}

export default ClientBookings;