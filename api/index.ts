import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import openapi from "../src/docs/openapi";
import apiRoutes from "../src/routes";
import { errorHandler } from "../src/middlewares/errorHandler";

// Express wrapper tailored for Vercel Serverless Functions
const server = express();

server.use(express.json());
server.use(cors());

// Health check
server.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, status: "healthy" });
});

// Mount API at root so public path on Vercel stays /api/*
server.use("/", apiRoutes);

// Swagger UI at /api/docs (public path)
server.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Error handler
server.use(errorHandler);

export default server;
