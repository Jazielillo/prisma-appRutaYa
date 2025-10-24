import { Router } from "express";
import { createVehiculo, deleteVehiculo, getVehiculo, listVehiculos, updateVehiculo } from "../../controllers/admin/vehiculos.controller";

const router = Router();

router.get("/", listVehiculos);
router.get("/:id", getVehiculo);
router.post("/", createVehiculo);
router.put("/:id", updateVehiculo);
router.delete("/:id", deleteVehiculo);

export default router;
