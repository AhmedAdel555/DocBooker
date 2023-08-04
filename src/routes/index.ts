import { Router } from "express";
import doctorRoutes from "./api/doctorRoutes";
import clientRoutes from './api/clientRoutes';
import entityRoutes from './api/entityRoutes';
import bookingRoutes from './api/bookingRoutes';
const routes = Router();

routes.use('/doctor', doctorRoutes);
routes.use('/client', clientRoutes);
routes.use('/entity',entityRoutes);
routes.use(bookingRoutes);
export default routes;
