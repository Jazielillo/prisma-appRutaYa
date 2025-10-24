import { prisma } from "../../lib/prisma";

export const vehiculosService = {
  list: (skip: number, take: number) => prisma.vehiculos.findMany({ skip, take, orderBy: { id: "asc" } }),
  count: () => prisma.vehiculos.count(),
  get: (id: number) => prisma.vehiculos.findUnique({ where: { id } }),
  create: (data: any) => prisma.vehiculos.create({ data }),
  update: (id: number, data: any) => prisma.vehiculos.update({ where: { id }, data }),
  delete: (id: number) => prisma.vehiculos.delete({ where: { id } }),
};
