import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { usuariosService } from "../../services/admin/usuarios.service";

// GET /admin/usuarios
export const listUsuarios = asyncHandler(async (req: Request, res: Response) => {
  const page = Number((req.query.page as string) ?? 1);
  const limit = Number((req.query.limit as string) ?? 20);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    usuariosService.list(skip, limit),
    usuariosService.count(),
  ]);

  res.json({ ok: true, total, page, limit, data });
});

// GET /admin/usuarios/:id
export const getUsuario = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await usuariosService.get(id);
  if (!item) return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
  res.json({ ok: true, data: item });
});

// POST /admin/usuarios
export const createUsuario = asyncHandler(async (req: Request, res: Response) => {
  const body: any = req.body ?? {};
  // Coerce numeric FKs if they come as strings
  if (body.id_rol !== undefined) body.id_rol = Number(body.id_rol);
  if (body.id_ruta !== undefined) body.id_ruta = Number(body.id_ruta);
  if (body.no_licencia !== undefined && body.no_licencia !== null) body.no_licencia = Number(body.no_licencia);

  const created = await usuariosService.create(body);
  res.status(201).json({ ok: true, data: created });
});

// PUT /admin/usuarios/:id
export const updateUsuario = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body: any = req.body ?? {};
  if (body.id_rol !== undefined) body.id_rol = Number(body.id_rol);
  if (body.id_ruta !== undefined) body.id_ruta = Number(body.id_ruta);
  if (body.no_licencia !== undefined) body.no_licencia = body.no_licencia !== null ? Number(body.no_licencia) : null;

  const updated = await usuariosService.update(id, body);
  res.json({ ok: true, data: updated });
});

// DELETE /admin/usuarios/:id
export const deleteUsuario = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await usuariosService.delete(id);
  res.json({ ok: true, data: deleted });
});
