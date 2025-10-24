import { prisma } from "../../lib/prisma";

export const usuariosService = {
  list: (skip: number, take: number) =>
    prisma.usuarios.findMany({ skip, take, include: { rol: true, ruta: true }, orderBy: { id: "asc" } }),
  count: () => prisma.usuarios.count(),
  get: (id: number) => prisma.usuarios.findUnique({ where: { id }, include: { rol: true, ruta: true } }),
  create: (data: any) => prisma.usuarios.create({ data }),
  update: (id: number, data: any) => prisma.usuarios.update({ where: { id }, data }),
  delete: (id: number) => prisma.usuarios.delete({ where: { id } }),
};
