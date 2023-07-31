import db from "../database";

class Booking{
  private static listOfCurrentBookings: Map<string, boolean> = new Map();
  
  public async book_appointment(ent_id:string, date_of_day : Date, start_time : Date, end_time : Date){
    try{
      Booking.listOfCurrentBookings.set(`${ent_id}-${date_of_day}-${start_time}`, true);
      const connection = await db.connect();
      const result1 = await connection.query(`SELECT status, number_of_patients from entity_appointment WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
      [ent_id, date_of_day, start_time, end_time]);
      console.log(result1);
      if(result1.rows[0].status === 'unavailable'){
        connection.release()
        throw new Error("this appointment not available");
      }
      const result2 = await connection.query(`INSERT INTO booking (ent_id,date_of_day,start_time,end_time) 
                                             VALUES ($1, $2,$3,$4) 
                                             returning id, COUNT(*) FROM booking WHERE ent_id = $5 AND date_of_day = $6 AND start_time = $7 AND end_time = $8;`, 
      [ent_id, date_of_day, start_time, end_time, ent_id, date_of_day, start_time, end_time]);
      console.log(result2);
      return result2.oid;
      if(!(result1.rows[0].number_of_patients > result2.rows[0].count)){
        const result3 = await connection.query(`UPDATING entity_appointment set status = 'unavailable' WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, [ent_id, date_of_day, start_time, end_time]);
        console.log(result3);
      }
      Booking.listOfCurrentBookings.delete(`${ent_id}-${date_of_day}-${start_time}`);
      connection.release()
    }
    catch(error){
      Booking.listOfCurrentBookings.delete(`${ent_id}-${date_of_day}-${start_time}`);
      throw new Error((error as Error).message);
    }
  }

  // public async cancel_appointment(){
    
  // }


}
export default Booking;