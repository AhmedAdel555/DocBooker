import { Router } from "express";
import clientController from "../../controllers/clientController";
import {body} from 'express-validator';
const routes = Router();

routes.post('/signup', 
[
  body("name").trim().isLength({min: 5}),
  body("email").trim().isEmail(),
  body("password").trim().isLength({min: 8}),
]
 ,clientController.signUp);


routes.post('/signin', [
  body("email").trim().isEmail(),
  body("password").trim().isLength({min: 8}),
] ,clientController.signIn);

routes.get('/bookings', clientController.showBookings);
export default routes;
