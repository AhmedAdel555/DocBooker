import { Router } from "express";

import EntityController from "../../controllers/entityController";

const routes = Router();

routes.get('/:entId/appointments' , EntityController.EntityAppointments);

export default routes;
