import { prisma } from "../../lib/prisma";

export const tiposReporteService = {
  list: (skip: number, take: number) => prisma.tipos_reporte.findMany({ skip, take, orderBy: { id: "asc" } }),
  count: () => prisma.tipos_reporte.count(),
  get: (id: number) => prisma.tipos_reporte.findUnique({ where: { id } }),
  create: (data: any) => prisma.tipos_reporte.create({ data }),
  update: (id: number, data: any) => prisma.tipos_reporte.update({ where: { id }, data }),
  delete: (id: number) => prisma.tipos_reporte.delete({ where: { id } }),
};
