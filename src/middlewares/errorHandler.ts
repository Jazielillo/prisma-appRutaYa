import { NextFunction, Request, Response } from "express";

// Centralized error handler
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = typeof err?.status === "number" ? err.status : 500;
  const message = err?.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "production") {
    console.error("[Error]", err);
  }

  res.status(status).json({
    ok: false,
    message,
    // expose details only in dev
    ...(process.env.NODE_ENV !== "production" && { stack: err?.stack }),
  });
}
