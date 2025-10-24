import { Router } from "express";
import userRoutes from "./user.routes";
import adminRoutes from "./admin";

const api = Router();

api.use("/usuarios", userRoutes);
api.use("/admin", adminRoutes);

export default api;
