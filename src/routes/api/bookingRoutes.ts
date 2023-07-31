import { Router } from "express";
import BookingController from '../../controllers/bookingController';
import authMiddleware from '../../middlewares/isAuth';
const routes = Router();

routes.post('/book', authMiddleware, BookingController.bookAppointment);

export default routes;