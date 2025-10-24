import { prisma } from "../lib/prisma";

type UsuarioCreate = {
  apellido_paterno: string;
  apellido_materno: string;
  nombre: number; // según tu schema actual es Int
  id_rol: number;
  no_licencia?: number | null;
  id_ruta: number;
};

type UsuarioUpdate = Partial<UsuarioCreate>;

export const userService = {
  list: () => prisma.usuarios.findMany(),
  getById: (id: number) => prisma.usuarios.findUnique({ where: { id } }),
  create: (data: UsuarioCreate) => prisma.usuarios.create({ data }),
  update: (id: number, data: UsuarioUpdate) =>
    prisma.usuarios.update({ where: { id }, data }),
  delete: (id: number) => prisma.usuarios.delete({ where: { id } }),
};
