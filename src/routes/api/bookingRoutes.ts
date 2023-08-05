import { Router } from "express";
import BookingController from '../../controllers/BookingController';
import authMiddleware from '../../middlewares/isAuth';
const routes = Router();

routes.post('/book', authMiddleware, BookingController.bookAppointment);
routes.delete('/cancel-appintment', authMiddleware, BookingController.cancelAppointment);
export default routes;