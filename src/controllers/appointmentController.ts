import {NextFunction, Request, Response} from "express";
import entityAppointment from "../types/entityAppointmentType";
import BookingServices from "../models/bookingServicesModel";
import PriorityComingAppointmentBookingService from "../models/priorityComingAppointmentBookingService";
import OnTimeAppointmentBookingService from "../models/onTimeAppointmentBookingService";
import NotifyByEmail from "../models/notifyByEmail";
import client from "../types/clientType";
import Client from "../models/clientModel";
class AppointmentController {
  
  public static async bookAppointment(req: Request, res: Response, next:NextFunction){
    try{
      let bookingServices:BookingServices;
      if(req.body.number_of_patients > 1){
        bookingServices = new PriorityComingAppointmentBookingService();
      }
      else{
        bookingServices = new OnTimeAppointmentBookingService();
      }
      const appointment:entityAppointment = {ent_id: req.body.ent_id, date_of_day: req.body.date_of_day, start_time:req.body.start_time, end_time:req.body.end_time, number_of_patients:req.body.number_of_patients};
      const newBooking = await bookingServices.book(appointment, req.body.clientId);
      res.status(200).json({meesage: 'successfully', booking_id:newBooking});
      const notification = new NotifyByEmail();
      const clientInstanse = new Client();
      const client = clientInstanse.getClient(req.body.clientId);
      
      notification.sendEmail(client as unknown as client, "appointment booked");

    }catch(error){
      next(error);
    }
  }

  public static async cancelAppointment(req: Request, res: Response, next:NextFunction){
    try{
      let bookingServices:BookingServices;
      if(req.body.number_of_patients > 1){
        bookingServices = new PriorityComingAppointmentBookingService();
      }
      else{
        bookingServices = new OnTimeAppointmentBookingService();
      }      
      const deletedBooking = await bookingServices.cancel(req.body.appoint_id, req.body.clientId);
      res.status(200).json({message: "booking succeffuly deleted", deletedBooking:deletedBooking});

      const notification = new NotifyByEmail();
      const clientInstanse = new Client();
      const client = clientInstanse.getClient(req.body.clientId);
      
      notification.sendEmail(client as unknown as client, "appointment canceled");
    }catch(error){
      next(error);
    }
  }

  
}

export default AppointmentController;