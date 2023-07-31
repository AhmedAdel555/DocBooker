import {NextFunction, Request, Response} from "express";
import Booking from "../models/bookingModel";

class BookingController {
  public static async bookAppointment(req: Request, res: Response, next:NextFunction){
    try{
      const booking = new Booking();
      const newBooking = await booking.book_appointment(req.body.ent_id, req.body.date_of_day, req.body.start_time, req.body.end_time);
      if(newBooking){
        res.status(200).json({meesage: 'succeded', booking_id:newBooking});
      }
      else{
        res.status(401).json({meesage: 'falied'});
      }
    }catch(error){
      next(error);
    }
  }
}

export default BookingController;