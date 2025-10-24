import { prisma } from "../../lib/prisma";

export const turnosService = {
  list: (skip: number, take: number) =>
    prisma.turnos.findMany({ skip, take, include: { chofer: true, vehiculo: true }, orderBy: { id: "asc" } }),
  count: () => prisma.turnos.count(),
  get: (id: number) => prisma.turnos.findUnique({ where: { id }, include: { chofer: true, vehiculo: true } }),
  create: (data: any) => prisma.turnos.create({ data }),
  update: (id: number, data: any) => prisma.turnos.update({ where: { id }, data }),
  delete: (id: number) => prisma.turnos.delete({ where: { id } }),
};
