import {Router} from "express"
import { guardarDonado, obtenerDonados, obtenerUnDonado } from "../controllers/donado.controller.js";

const router = Router();

router.get('/donado/obtener',obtenerDonados);

router.get('/donado/obtener/:id',obtenerUnDonado);

router.post('/donado/guardar',guardarDonado);

export default router;