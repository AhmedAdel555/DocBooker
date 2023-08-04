import {NextFunction, Request, Response} from "express";
import Entity_Appointments from "../models/entityAppointmentsModel";

class EntityController {
  public static async EntityAppointments(req: Request, res: Response, next:NextFunction ){
    try{
      const entId = req.params.entId;
      const entityAppointments = new Entity_Appointments();
      const apointments = await entityAppointments.getAppointmentsForEntity(entId);
      if(apointments){
        return res.status(200).json({
          message: "succeded",
          apointments: apointments
        })
      }
      else{
        return res.status(404).json({
          message: "falied to get appointments for this entity",
        })
    }
    }catch(error){
      next(error)
    }
  }
}
export default EntityController;