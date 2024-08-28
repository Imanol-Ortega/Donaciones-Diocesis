import {Router} from "express"
import { obtenerInstituciones } from "../controllers/institucion.controller.js";

const router = Router();

router.get('/institucion/obtener',obtenerInstituciones);



export default router;