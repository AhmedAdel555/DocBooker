import {NextFunction, Request, Response} from "express";
import Doctor from "../models/doctorModel";
import Search from "../models/searchModel";
import DoctorEntities from '../models/doctorEntitiesModel';

class DoctorController {
  public static async getOneDoctor(req: Request, res: Response, next:NextFunction){
    try{
      const id = req.params.doctorId;
      const doctorInstance = new Doctor();
      const doctor = await doctorInstance.getDoctor(id);
      if(doctor){
        return res.status(200).json({message: "succeded", doctor: doctor});
      }
      else{
        return res.status(404).json({message: "failed to find this doctor"})
      }
    }catch(error){
      next(error)
    }
  }

  public static async search(req: Request, res: Response, next:NextFunction )
    {
      try{
        const searchInstance = new Search();
        const doctors = await searchInstance.searchForDoctor(req.body);
        return res.status(200).json({message: "search done", doctors: doctors});
      }catch(error){
        next(error)
      }
    }

    public static async doctorEntities(req: Request, res: Response, next:NextFunction ){
      try{
        const {docId} = req.params;
        const doctorEntitiesInstance = new DoctorEntities();
        const entities = await doctorEntitiesInstance.getEntitiesForDoctor(docId);
        if(entities){
          return res.status(200).json({
            message: "succeded",
            entities: entities
          })
        }
        else{
            return res.status(404).json({
            message: "No entity for this doctor",
        })
      }
      }catch(error){
        next(error)
      }
  }
}

export default DoctorController;