import express, { Request, Response } from "express";
import apiRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Core middlewares
app.use(express.json());

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, status: "healthy" });
});

// API routes
app.use("/api", apiRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
