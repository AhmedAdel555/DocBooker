import { Router } from "express";
import doctorRoutes from "./api/doctorRoutes";
import clientRoutes from './api/clientRoutes';
import entityRoutes from './api/entityRoutes';
import appoinmentRoutes from './api/appoinmentRoutes';
const routes = Router();

routes.use('/doctor', doctorRoutes);
routes.use('/client', clientRoutes);
routes.use('/entity',entityRoutes);
routes.use('/appointment', appoinmentRoutes);
export default routes;
