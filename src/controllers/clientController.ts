import {NextFunction, Request, Response} from "express";
import AuthenticationClient from "../models/authClientModel";
import ClientBookings from "../models/clientBookings";
import Jwt from "jsonwebtoken";
import convig from '../utils/env.config';
import {validationResult} from 'express-validator';

class clientContoller {
  public static async signUp(req: Request, res: Response, next:NextFunction){
    try{
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({message: "please write correct email and password greater than 8 character"})
      }
      const auth = new AuthenticationClient();
      const clientInfo = {...req.body};
      const newClient = await auth.register(clientInfo);
      if(!newClient){
        return res.status(401).json({message: "email is already exist"})
      }
      else{
        const token = Jwt.sign({clientId: newClient.id}, convig.SECRETJWTKEY as string);
        return res.status(201).json({messgae: 'successfully created', data: {...newClient, token:token}})
      }
    }catch(error){
      next(error);
    }
  }


  public static async signIn(req: Request, res: Response, next:NextFunction){
        try{
          const result = validationResult(req);
          if (!result.isEmpty()) {
            return res.status(422).json({message: "email or password is incorrect"})
          }
          const {email, password} = req.body;
          const auth = new AuthenticationClient();
          const clientInfo = await auth.login(email, password);
          if(!clientInfo){
            return res.status(401).json({message: "email or password is incorrect"})
          }
          else{
            const token = Jwt.sign({clientId: clientInfo.id}, convig.SECRETJWTKEY as string);
            return res.status(200).json({
              message: "user authunticated succedfully",
              data: {...clientInfo, token:token}
            })
          }
          
        }catch(error){
          next(error);
        }
    }

  public static async showBookings(req: Request, res: Response, next:NextFunction){
      try{
        const clientBookingsInstance = new ClientBookings();
        const bookings = await clientBookingsInstance.getClientBooking(req.body.clientId);
        return res.status(200).json({message: 'succeded', bookings:bookings});
      }catch(error){
        next(error)
      }
  }
}

export default clientContoller;