import {NextFunction, Request, Response} from "express";
import Jwt from "jsonwebtoken";
import convig from '../utils/env.config';

const validateAuthntivation = (req: Request, res: Response, next:NextFunction) => {
    try{
        const authHeader = req.get('Authorization');
        if(authHeader)
        {
          const bearer = authHeader.split(' ')[0].toLowerCase();
          const token = authHeader.split(' ')[1];
          if(token && bearer === 'bearer'){
              const decode: any = Jwt.verify(token, convig.SECRETJWTKEY as string);
              if(decode){
                req.body.clientId = decode.clientId;
                next()
              }
              else{
                throw new Error("Opps error");
              }
          }
          else{
            throw new Error("Opps error");
          }
        }else{
          throw new Error("Opps error");
        }
    }catch(error){
      next(error)
    }
}

export default validateAuthntivation;