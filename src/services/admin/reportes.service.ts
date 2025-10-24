import { prisma } from "../../lib/prisma";

export const reportesService = {
  list: (skip: number, take: number) =>
    prisma.reportes.findMany({
      skip,
      take,
      include: { chofer: true, vehiculo: true, turno: true, tipo: true },
      orderBy: { id: "asc" },
    }),
  count: () => prisma.reportes.count(),
  get: (id: number) =>
    prisma.reportes.findUnique({ where: { id }, include: { chofer: true, vehiculo: true, turno: true, tipo: true } }),
  create: (data: any) => prisma.reportes.create({ data }),
  update: (id: number, data: any) => prisma.reportes.update({ where: { id }, data }),
  delete: (id: number) => prisma.reportes.delete({ where: { id } }),
};
