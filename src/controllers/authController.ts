import {NextFunction, Request, Response} from "express";
import Authentication from "../models/authModel";
import Jwt from "jsonwebtoken";
import convig from '../utils/env.config';
import axios from 'axios';

class AuthController {
  public static async signIn(req: Request, res: Response, next:NextFunction){
        try{
          const {email, password} = req.body;
          const auth = new Authentication();
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
  public static async signUp(req: Request, res: Response, next:NextFunction){
    try{
      const auth = new Authentication();
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

  public static async signInWithGoogle(req: Request, res: Response, next:NextFunction){
    try{
      const {googleAccessToken} = req.body;
      if(!googleAccessToken){
          throw new Error("google access token is not found");
      }
      let response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: {
              "Authorization": `Bearer ${googleAccessToken}`
          }
      })
      const auth = new Authentication();
      const isExist = await auth.clientExist(response.data.email);
      if(isExist){
        const token = Jwt.sign({clientId: isExist.id}, convig.SECRETJWTKEY as string);
        return res.status(200).json({
          message: "user authunticated succedfully",
          data: {...isExist, token:token}
        })
      }

      const newClient = await auth.register({name:response.data.given_name + response.data.family_name, email: response.data.email, password: 'defult password'});
      if(newClient){
        const token = Jwt.sign({clientId: newClient.id}, convig.SECRETJWTKEY as string);
        return res.status(201).json({messgae: 'successfully created', data: {...newClient, token:token}})
      }
      
    }catch(error){
      next(error)
    }
  }
}
export default AuthController;