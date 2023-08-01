import { Router } from "express";
import doctorRoutes from "./api/doctorRoutes";
import authRoutes from './api/authRoutes';
import entityRoutes from './api/entityRoutes';
import appointmentsRoutes from './api/appointmentsRoutes';
import bookingRoutes from './api/bookingRoutes';
const routes = Router();

routes.use(doctorRoutes);
routes.use(authRoutes);
routes.use(entityRoutes);
routes.use(appointmentsRoutes)
routes.use(bookingRoutes);
export default routes;
