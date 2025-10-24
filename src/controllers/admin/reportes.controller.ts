import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { reportesService } from "../../services/admin/reportes.service";

export const listReportes = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    reportesService.list(skip, limit),
    reportesService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getReporte = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await reportesService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Reporte no encontrado" });
  res.json({ ok: true, data: item });
});

export const createReporte = asyncHandler(async (req: Request, res: Response) => {
  const body: any = req.body ?? {};
  if (body.id_chofer !== undefined) body.id_chofer = Number(body.id_chofer);
  if (body.id_vehiculo !== undefined) body.id_vehiculo = Number(body.id_vehiculo);
  if (body.id_turno !== undefined) body.id_turno = Number(body.id_turno);
  if (body.id_tipo_reporte !== undefined) body.id_tipo_reporte = Number(body.id_tipo_reporte);
  const created = await reportesService.create(body);
  res.status(201).json({ ok: true, data: created });
});

export const updateReporte = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body: any = req.body ?? {};
  if (body.id_chofer !== undefined) body.id_chofer = Number(body.id_chofer);
  if (body.id_vehiculo !== undefined) body.id_vehiculo = Number(body.id_vehiculo);
  if (body.id_turno !== undefined) body.id_turno = Number(body.id_turno);
  if (body.id_tipo_reporte !== undefined) body.id_tipo_reporte = Number(body.id_tipo_reporte);
  const updated = await reportesService.update(id, body);
  res.json({ ok: true, data: updated });
});

export const deleteReporte = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await reportesService.delete(id);
  res.json({ ok: true, data: deleted });
});
