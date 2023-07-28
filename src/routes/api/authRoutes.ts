import { Router } from "express";
import authController from '../../controllers/authController';

const routes = Router();

routes.post('/signup', authController.signUp);
routes.post('/signin', authController.signIn);
routes.post('/sign-in-with-google', authController.signInWithGoogle);

export default routes;
