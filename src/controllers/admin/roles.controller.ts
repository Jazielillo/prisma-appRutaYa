import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { rolesService } from "../../services/admin/roles.service";

export const listRoles = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    rolesService.list(skip, limit),
    rolesService.count(),
  ]);
  res.json({ ok: true, total, page, limit, data });
});

export const getRol = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await rolesService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Rol no encontrado" });
  res.json({ ok: true, data: item });
});

export const createRol = asyncHandler(async (req: Request, res: Response) => {
  const created = await rolesService.create(req.body);
  res.status(201).json({ ok: true, data: created });
});

export const updateRol = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await rolesService.update(id, req.body);
  res.json({ ok: true, data: updated });
});

export const deleteRol = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await rolesService.delete(id);
  res.json({ ok: true, data: deleted });
});
