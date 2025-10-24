import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seed() {
  await prisma.usuarios.createMany({
    data: [
      {
        apellido_paterno: "García",
        apellido_materno: "López",
        nombre: "Orlando",
        email: "orlando@example.com",
        password: "hash-demo-1",
        id_rol: 2,
        no_licencia: 12345,
        id_ruta: 10,
      },
      {
        apellido_paterno: "Martínez",
        apellido_materno: "Sánchez",
        nombre: "Ana",
        email: "ana@example.com",
        password: "hash-demo-2",
        id_rol: 1,
        no_licencia: null,
        id_ruta: 7,
      },
      {
        apellido_paterno: "Hernández",
        apellido_materno: "Pérez",
        nombre: "Carlos",
        email: "carlos@example.com",
        password: "hash-demo-3",
        id_rol: 3,
        no_licencia: 67890,
        id_ruta: 4,
      },
      {
        apellido_paterno: "Ramírez",
        apellido_materno: "Torres",
        nombre: "María",
        email: "maria@example.com",
        password: "hash-demo-4",
        id_rol: 2,
        no_licencia: null,
        id_ruta: 11,
      },
      {
        apellido_paterno: "Flores",
        apellido_materno: "Gómez",
        nombre: "Pedro",
        email: "pedro@example.com",
        password: "hash-demo-5",
        id_rol: 1,
        no_licencia: 22222,
        id_ruta: 6,
      },
    ],
    skipDuplicates: true,
  });
}

seed().then(() => prisma.$disconnect());