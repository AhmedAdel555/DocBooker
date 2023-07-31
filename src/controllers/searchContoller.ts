import {NextFunction, Request, Response} from "express";
import Search from "../models/searchModel";

class SearchController {
    public static async search(req: Request, res: Response, next:NextFunction )
    {
      try{
        const searchInstance = new Search();
        const doctors = await searchInstance.searchForDoctor(req.body.specialization, req.body.state, req.body.city, req.body.name);
        return res.status(200).json({message: "search done", doctor: doctors});
      }catch(error){
        next(error)
      }
    }
}

export default SearchController;
