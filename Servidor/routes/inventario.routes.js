import {Router} from "express"
import { guardarInventario, obtenerInventario, obtenerUnInventario } from "../controllers/inventario.controller.js";

const router = Router();

router.post('/inventario/guardar',guardarInventario);

router.get('/inventario/obtener',obtenerInventario);

router.get('/inventario/obtener/id',obtenerUnInventario);

export default router;