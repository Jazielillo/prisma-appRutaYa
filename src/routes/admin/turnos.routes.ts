import { Router } from "express";
import { createTurno, deleteTurno, getTurno, listTurnos, updateTurno } from "../../controllers/admin/turnos.controller";

const router = Router();

router.get("/", listTurnos);
router.get("/:id", getTurno);
router.post("/", createTurno);
router.put("/:id", updateTurno);
router.delete("/:id", deleteTurno);

export default router;
