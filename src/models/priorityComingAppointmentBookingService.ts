import db from "../database";
import entityAppointment from "../types/entityAppointmentType";
import booking from '../types/bookingType'
import BookingServices from "./bookingServicesModel";
class PriorityComingAppointmentBookingService extends BookingServices{

  public override async book(appointment: entityAppointment, clin_id: string): Promise<booking> {
    try{
        const appointmentKey =  `${appointment.ent_id}-${appointment.date_of_day}-${appointment.start_time}`
        // check if anthor client book this appointment now 
        if(PriorityComingAppointmentBookingService.listOfCurrentBookings.includes(appointmentKey)){
          throw new Error("appointment is already booked now")
        }
        // add appointment to the list
        PriorityComingAppointmentBookingService.listOfCurrentBookings.push(appointmentKey);
        const connection = await db.connect();
        const appointmentInfo = await connection.query(`SELECT status, number_of_patients from entity_appointment WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
        [appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
        // check for availability
        if(appointmentInfo.rows[0].status === 'unavailable'){
          connection.release();
          throw new Error("this appointment not available");
        }
        // add booking
        const newBooking = await connection.query(`INSERT INTO booking (clin_id,ent_id,date_of_day,start_time,end_time) 
                                             VALUES ($1, $2,$3,$4,$5)
                                             returning *`, 
        [clin_id , appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
        const capasity = await connection.query(`SELECT COUNT(*) FROM booking WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, 
        [appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
        // update status if needed
        if(capasity.rows[0].count >= appointment.number_of_patients){
          await connection.query(`UPDATE entity_appointment set status = 'unavailable' WHERE ent_id = $1 AND date_of_day = $2 AND start_time = $3 AND end_time = $4; `, [appointment.ent_id, appointment.date_of_day, appointment.start_time, appointment.end_time]);
        }
        let index = PriorityComingAppointmentBookingService.listOfCurrentBookings.indexOf(appointmentKey);
        if (index !== -1) 
        {
          PriorityComingAppointmentBookingService.listOfCurrentBookings.splice(index, 1);
        }
        return newBooking.rows[0];
    }catch(error){
      throw new Error((error as Error).message)
    }
  }

}

export default PriorityComingAppointmentBookingService;