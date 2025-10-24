import { Router } from "express";
import { createPuntoRuta, deletePuntoRuta, getPuntoRuta, listPuntosRuta, updatePuntoRuta } from "../../controllers/admin/puntos_ruta.controller";

const router = Router();

router.get("/", listPuntosRuta);
router.get("/:id", getPuntoRuta);
router.post("/", createPuntoRuta);
router.put("/:id", updatePuntoRuta);
router.delete("/:id", deletePuntoRuta);

export default router;
