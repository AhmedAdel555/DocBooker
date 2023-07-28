import {NextFunction, Request, Response} from "express";
import Search from "../models/searchModel";

class searchController {
    public static async search(req: Request, res: Response, next:NextFunction )
    {
      const searchInstance = new Search();
      const doctors = await searchInstance.searchForDoctor(req.body.specialization, req.body.state, req.body.city, req.body.name);
      return res.status(200).json({message: "search done", doctor: doctors});
    }
}

export default searchController;
