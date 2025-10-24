import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { vehiculosService } from "../../services/admin/vehiculos.service";

export const listVehiculos = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    vehiculosService.list(skip, limit),
    vehiculosService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getVehiculo = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await vehiculosService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Vehículo no encontrado" });
  res.json({ ok: true, data: item });
});

export const createVehiculo = asyncHandler(async (req: Request, res: Response) => {
  const created = await vehiculosService.create(req.body);
  res.status(201).json({ ok: true, data: created });
});

export const updateVehiculo = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await vehiculosService.update(id, req.body);
  res.json({ ok: true, data: updated });
});

export const deleteVehiculo = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await vehiculosService.delete(id);
  res.json({ ok: true, data: deleted });
});
