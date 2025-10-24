import { prisma } from "../../lib/prisma";

export const puntosRutaService = {
  list: (skip: number, take: number) =>
    prisma.puntos_ruta.findMany({ skip, take, include: { ruta: true }, orderBy: { id: "asc" } }),
  count: () => prisma.puntos_ruta.count(),
  get: (id: number) => prisma.puntos_ruta.findUnique({ where: { id }, include: { ruta: true } }),
  create: (data: any) => prisma.puntos_ruta.create({ data }),
  update: (id: number, data: any) => prisma.puntos_ruta.update({ where: { id }, data }),
  delete: (id: number) => prisma.puntos_ruta.delete({ where: { id } }),
};
