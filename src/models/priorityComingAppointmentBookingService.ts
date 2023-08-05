import db from "../database";
import entityAppointment from "../types/entityAppointmentType";
import booking from '../types/bookingType'
import BookingServices from "./bookingServicesModel";
class PriorityComingAppointmentBookingService extends BookingServices{

  public override book(appointment: entityAppointment, clin_id: string): Promise<booking> {
    throw new Error("Method not implemented.");
  }

}