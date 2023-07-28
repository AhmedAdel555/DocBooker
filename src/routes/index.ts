import { Router } from "express";
import doctorRoutes from "./api/doctorRoutes";
import authRoutes from './api/authRoutes';
const routes = Router();

routes.use(doctorRoutes);
routes.use(authRoutes);
export default routes;
