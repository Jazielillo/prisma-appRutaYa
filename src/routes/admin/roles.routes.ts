import { Router } from "express";
import { createRol, deleteRol, getRol, listRoles, updateRol } from "../../controllers/admin/roles.controller";

const router = Router();

router.get("/", listRoles);
router.get("/:id", getRol);
router.post("/", createRol);
router.put("/:id", updateRol);
router.delete("/:id", deleteRol);

export default router;
