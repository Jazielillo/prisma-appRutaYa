import { Router } from "express";
import userRoutes from "./user.routes";

const api = Router();

api.use("/usuarios", userRoutes);

export default api;
