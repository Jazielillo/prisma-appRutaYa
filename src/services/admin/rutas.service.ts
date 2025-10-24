import { prisma } from "../../lib/prisma";

export const rutasService = {
  list: (skip: number, take: number) =>
    prisma.rutas.findMany({ skip, take, include: { usuarios: true, puntos: true }, orderBy: { id: "asc" } }),
  count: () => prisma.rutas.count(),
  get: (id: number) => prisma.rutas.findUnique({ where: { id }, include: { usuarios: true, puntos: true } }),
  create: (data: any) => prisma.rutas.create({ data }),
  update: (id: number, data: any) => prisma.rutas.update({ where: { id }, data }),
  delete: (id: number) => prisma.rutas.delete({ where: { id } }),
};
