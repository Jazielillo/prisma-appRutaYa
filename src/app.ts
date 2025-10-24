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

// Swagger UI via CDN to avoid static asset issues on serverless
app.get("/api/docs", (_req: Request, res: Response) => {
  const html = `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>API Docs</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      <style>body { margin: 0; background: #fff; }</style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            url: '/api/docs.json',
            dom_id: '#swagger-ui',
            presets: [SwaggerUIBundle.presets.apis],
            layout: 'BaseLayout',
            docExpansion: 'none',
            defaultModelsExpandDepth: -1,
          });
        };
      </script>
    </body>
  </html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
