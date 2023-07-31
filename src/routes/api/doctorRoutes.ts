import { Router } from "express";
import searchController from "../../controllers/searchContoller";
import doctorController from "../../controllers/doctorController";
const routes = Router();

routes.post('/search' ,searchController.search);
routes.get('/doctor/:doctorId', doctorController.getOneDoctor);

export default routes;