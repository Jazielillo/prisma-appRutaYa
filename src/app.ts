import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import openapi from "./docs/openapi";
import apiRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";



const app = express();

// Core middlewares
app.use(express.json());
app.use(cors());

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, status: "healthy" });
});

// API routes
app.use("/api", apiRoutes);

// Swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Error handler (must be last)
app.use(errorHandler);

export default app;
