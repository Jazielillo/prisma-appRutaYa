import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuario, listUsuarios, updateUsuario } from "../../controllers/admin/usuarios.controller";

const router = Router();

router.get("/", listUsuarios);
router.get("/:id", getUsuario);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

export default router;
