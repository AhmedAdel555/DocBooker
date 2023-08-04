import { Router } from "express";
import doctorController from "../../controllers/doctorController";
const routes = Router();

routes.post('/search' ,doctorController.search);
routes.get('/:doctorId', doctorController.getOneDoctor);
routes.get('/:doctorId/entities', doctorController.doctorEntities);
export default routes;