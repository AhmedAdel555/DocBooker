import {NextFunction, Request, Response} from "express";
import Entity from '../models/entityModel';

class EntityController{
    public static async doctorEntities(req: Request, res: Response, next:NextFunction ){
        try{
          const {docId} = req.params;
          const entityInstance = new Entity();
          const entities = await entityInstance.getEntitiesForDoctor(docId);
          if(entities.length > 0){
            return res.status(200).json({
              message: "succeded",
              entities: entities
            })
          }
          else{
            return res.status(404).json({
              message: "falied",
              entities: entities
            })
        }
        }catch(error){
          next(error)
        }
    }
}
export default EntityController;