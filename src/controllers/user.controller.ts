import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { userService } from "../services/user.service";

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const usuarios = await userService.list();
  res.json({ ok: true, data: usuarios });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const usuario = await userService.getById(id);
  if (!usuario) {
    return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
  }
  res.json({ ok: true, data: usuario });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    apellido_paterno,
    apellido_materno,
    nombre,
    id_rol,
    no_licencia,
    id_ruta,
  } = req.body;

  const created = await userService.create({
    apellido_paterno,
    apellido_materno,
    nombre: Number(nombre),
    id_rol: Number(id_rol),
    no_licencia: no_licencia !== undefined && no_licencia !== null ? Number(no_licencia) : null,
    id_ruta: Number(id_ruta),
  });
  res.status(201).json({ ok: true, data: created });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    apellido_paterno,
    apellido_materno,
    nombre,
    id_rol,
    no_licencia,
    id_ruta,
  } = req.body;

  const updated = await userService.update(id, {
    ...(apellido_paterno !== undefined && { apellido_paterno }),
    ...(apellido_materno !== undefined && { apellido_materno }),
    ...(nombre !== undefined && { nombre: Number(nombre) }),
    ...(id_rol !== undefined && { id_rol: Number(id_rol) }),
    ...(no_licencia !== undefined && { no_licencia: no_licencia !== null ? Number(no_licencia) : null }),
    ...(id_ruta !== undefined && { id_ruta: Number(id_ruta) }),
  });
  res.json({ ok: true, data: updated });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await userService.delete(id);
  res.json({ ok: true, data: deleted });
});
