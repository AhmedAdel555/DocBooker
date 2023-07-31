import { Router } from "express";

import AppointmentsController from "../../controllers/appointmentsController";

const routes = Router();

routes.get('/appointments/entity/:entId', AppointmentsController.EntityAppointments)

export default routes;