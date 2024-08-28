import {Router} from "express"
import { guardarDonacion, obtenerDonacion, obtenerUnaDonacion } from "../controllers/donante.controller.js";

const router = Router();

router.post('/donante/guardar',guardarDonacion);

router.get('/donante/obtener',obtenerDonacion);

router.get('/donante/obtener/:id',obtenerUnaDonacion);

export default router;