import { Router } from "express";
import AppointmentController from '../../controllers/appointmentController';
import authMiddleware from '../../middlewares/isAuth';
const routes = Router();

routes.post('/book', authMiddleware, AppointmentController.bookAppointment);
routes.delete('/cancel-booking/:booking_id', authMiddleware, AppointmentController.cancelAppointment);
export default routes;