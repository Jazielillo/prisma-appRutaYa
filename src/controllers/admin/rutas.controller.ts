import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { rutasService } from "../../services/admin/rutas.service";

export const listRutas = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    rutasService.list(skip, limit),
    rutasService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getRuta = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await rutasService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Ruta no encontrada" });
  res.json({ ok: true, data: item });
});

export const createRuta = asyncHandler(async (req: Request, res: Response) => {
  const created = await rutasService.create(req.body);
  res.status(201).json({ ok: true, data: created });
});

export const updateRuta = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await rutasService.update(id, req.body);
  res.json({ ok: true, data: updated });
});

export const deleteRuta = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await rutasService.delete(id);
  res.json({ ok: true, data: deleted });
});
