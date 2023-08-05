import {NextFunction, Request, Response} from "express";
import BookingServices from "../models/bookingServicesModel";
import entityAppointment from "../types/entityAppointmentType";
class BookingController {
  
  // public static async bookAppointment(req: Request, res: Response, next:NextFunction){
  //   try{
  //     const bookingServices = new BookingServices();
  //     const appointment:entityAppointment = {ent_id: req.body.ent_id, date_of_day: req.body.date_of_day, start_time:req.body.start_time, end_time:req.body.end_time};
  //     const newBooking = await bookingServices.book_appointment(appointment, req.body.clientId);
  //     if(newBooking){
  //       res.status(200).json({meesage: 'succeded', booking_id:newBooking});
  //     }
  //     else{
  //       res.status(401).json({meesage: 'falied'});
  //     }
  //   }catch(error){
  //     next(error);
  //   }
  // }

  // public static async cancelAppointment(req: Request, res: Response, next:NextFunction){
  //   try{
  //     const bookingServices = new BookingServices();
  //     await bookingServices.cancel_appointment(req.body.appoint_id, req.body.clientId);
  //     res.status(200).json({message: "booking succeffuly deleted"});
  //   }catch(error){
  //     next(error);
  //   }
  // }
}

export default BookingController;