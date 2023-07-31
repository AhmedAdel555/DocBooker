import { Router } from "express";
import doctorRoutes from "./api/doctorRoutes";
import authRoutes from './api/authRoutes';
import entityRoutes from './api/entityRoutes';
import appointmentsRoutes from './api/appointmentsRoutes';
const routes = Router();

routes.use(doctorRoutes);
routes.use(authRoutes);
routes.use(entityRoutes);
routes.use(appointmentsRoutes)
export default routes;
