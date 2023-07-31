import {NextFunction, Request, Response} from "express";
import Doctor from "../models/doctorModel";
class DoctorController {
  public static async getOneDoctor(req: Request, res: Response, next:NextFunction){
    try{
      const id = req.params.doctorId;
      const doctorInstance = new Doctor();
      const doctor = await doctorInstance.getDoctor(id);
      return res.status(200).json({message: "succeded", doctor: doctor});
    }catch(error){
      next(error)
    }
  }
}

export default DoctorController;