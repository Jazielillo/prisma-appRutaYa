import { prisma } from "../../lib/prisma";

export const rolesService = {
  list: (skip: number, take: number) => prisma.roles.findMany({ skip, take, orderBy: { id: "asc" } }),
  count: () => prisma.roles.count(),
  get: (id: number) => prisma.roles.findUnique({ where: { id } }),
  create: (data: any) => prisma.roles.create({ data }),
  update: (id: number, data: any) => prisma.roles.update({ where: { id }, data }),
  delete: (id: number) => prisma.roles.delete({ where: { id } }),
};
