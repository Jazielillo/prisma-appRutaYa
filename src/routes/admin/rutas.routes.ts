import { Router } from "express";
import { createRuta, deleteRuta, getRuta, listRutas, updateRuta } from "../../controllers/admin/rutas.controller";

const router = Router();

router.get("/", listRutas);
router.get("/:id", getRuta);
router.post("/", createRuta);
router.put("/:id", updateRuta);
router.delete("/:id", deleteRuta);

export default router;
