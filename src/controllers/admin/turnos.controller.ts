import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { turnosService } from "../../services/admin/turnos.service";

export const listTurnos = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    turnosService.list(skip, limit),
    turnosService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getTurno = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await turnosService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Turno no encontrado" });
  res.json({ ok: true, data: item });
});

export const createTurno = asyncHandler(async (req: Request, res: Response) => {
  const body: any = req.body ?? {};
  if (body.id_chofer !== undefined) body.id_chofer = Number(body.id_chofer);
  if (body.id_vehiculo !== undefined) body.id_vehiculo = Number(body.id_vehiculo);
  const created = await turnosService.create(body);
  res.status(201).json({ ok: true, data: created });
});

export const updateTurno = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body: any = req.body ?? {};
  if (body.id_chofer !== undefined) body.id_chofer = Number(body.id_chofer);
  if (body.id_vehiculo !== undefined) body.id_vehiculo = Number(body.id_vehiculo);
  const updated = await turnosService.update(id, body);
  res.json({ ok: true, data: updated });
});

export const deleteTurno = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await turnosService.delete(id);
  res.json({ ok: true, data: deleted });
});
