import {NextFunction, Request, Response} from "express";
import Entity_Appointments from "../models/entityAppointmentsModel";
class AppointmentsController{
  public static async EntityAppointments(req: Request, res: Response, next:NextFunction ){
    try{
      const {entId} = req.body;
      const appointmentInstance = new Entity_Appointments();
      const apointments = await appointmentInstance.getAppointmentsForEntity(entId);
      if(apointments.length > 0){
        return res.status(200).json({
          message: "succeded",
          apointments: apointments
        })
      }
      else{
        return res.status(404).json({
          message: "falied to get appointments for this entity",
          apointments: apointments
        })
    }
    }catch(error){
      next(error)
    }
}
}
export default AppointmentsController;