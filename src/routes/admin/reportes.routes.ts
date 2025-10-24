import { Router } from "express";
import { createReporte, deleteReporte, getReporte, listReportes, updateReporte } from "../../controllers/admin/reportes.controller";

const router = Router();

router.get("/", listReportes);
router.get("/:id", getReporte);
router.post("/", createReporte);
router.put("/:id", updateReporte);
router.delete("/:id", deleteReporte);

export default router;
