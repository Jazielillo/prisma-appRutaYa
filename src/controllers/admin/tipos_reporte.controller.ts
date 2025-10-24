import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { tiposReporteService } from "../../services/admin/tipos_reporte.service";

export const listTiposReporte = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    tiposReporteService.list(skip, limit),
    tiposReporteService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getTipoReporte = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await tiposReporteService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Tipo de reporte no encontrado" });
  res.json({ ok: true, data: item });
});

export const createTipoReporte = asyncHandler(async (req: Request, res: Response) => {
  const created = await tiposReporteService.create(req.body);
  res.status(201).json({ ok: true, data: created });
});

export const updateTipoReporte = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await tiposReporteService.update(id, req.body);
  res.json({ ok: true, data: updated });
});

export const deleteTipoReporte = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await tiposReporteService.delete(id);
  res.json({ ok: true, data: deleted });
});
