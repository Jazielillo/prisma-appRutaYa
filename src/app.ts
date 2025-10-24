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

// Serve OpenAPI JSON explicitly (helps in serverless/platforms)
app.get("/api/docs.json", (_req: Request, res: Response) => {
  res.json(openapi);
});

// Swagger UI (loads the spec from /api/docs.json)
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: { url: "/api/docs.json" },
    customSiteTitle: "API Docs",
  })
);

// Error handler (must be last)
app.use(errorHandler);

export default app;
