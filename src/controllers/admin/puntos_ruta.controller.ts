import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { puntosRutaService } from "../../services/admin/puntos_ruta.service";

export const listPuntosRuta = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    puntosRutaService.list(skip, limit),
    puntosRutaService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getPuntoRuta = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await puntosRutaService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Punto de ruta no encontrado" });
  res.json({ ok: true, data: item });
});

export const createPuntoRuta = asyncHandler(async (req: Request, res: Response) => {
  const body: any = req.body ?? {};
  if (body.id_ruta !== undefined) body.id_ruta = Number(body.id_ruta);
  if (body.altitud !== undefined && body.altitud !== null) body.altitud = Number(body.altitud);
  if (body.longitud !== undefined && body.longitud !== null) body.longitud = Number(body.longitud);
  const created = await puntosRutaService.create(body);
  res.status(201).json({ ok: true, data: created });
});

export const updatePuntoRuta = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body: any = req.body ?? {};
  if (body.id_ruta !== undefined) body.id_ruta = Number(body.id_ruta);
  if (body.altitud !== undefined) body.altitud = body.altitud !== null ? Number(body.altitud) : null;
  if (body.longitud !== undefined) body.longitud = body.longitud !== null ? Number(body.longitud) : null;
  const updated = await puntosRutaService.update(id, body);
  res.json({ ok: true, data: updated });
});

export const deletePuntoRuta = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await puntosRutaService.delete(id);
  res.json({ ok: true, data: deleted });
});
