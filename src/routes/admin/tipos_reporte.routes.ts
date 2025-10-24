import { Router } from "express";
import { createTipoReporte, deleteTipoReporte, getTipoReporte, listTiposReporte, updateTipoReporte } from "../../controllers/admin/tipos_reporte.controller";

const router = Router();

router.get("/", listTiposReporte);
router.get("/:id", getTipoReporte);
router.post("/", createTipoReporte);
router.put("/:id", updateTipoReporte);
router.delete("/:id", deleteTipoReporte);

export default router;
