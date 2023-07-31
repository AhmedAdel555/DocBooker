import { Router } from "express";

import EntityController from "../../controllers/entityController";

const routes = Router();

routes.get('/entity/doctor/:docId', EntityController.doctorEntities)

export default routes;
