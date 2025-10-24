import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seed() {
  // Create roles first
  await prisma.roles.createMany({
    data: [
      { nombre: "Admin" },
      { nombre: "Conductor" },
      { nombre: "Usuario" },
    ],
    skipDuplicates: true,
  });

  // Create users and connect to roles by unique `nombre`
  const users = [
    {
      apellido_paterno: "García",
      apellido_materno: "López",
      nombre: "Orlando",
      email: "orlando@example.com",
      password: "hash-demo-1",
      rolNombre: "Conductor",
      no_licencia: 12345,
      id_ruta: 10,
    },
    {
      apellido_paterno: "Martínez",
      apellido_materno: "Sánchez",
      nombre: "Ana",
      email: "ana@example.com",
      password: "hash-demo-2",
      rolNombre: "Usuario",
      no_licencia: null,
      id_ruta: 7,
    },
    {
      apellido_paterno: "Hernández",
      apellido_materno: "Pérez",
      nombre: "Carlos",
      email: "carlos@example.com",
      password: "hash-demo-3",
      rolNombre: "Usuario",
      no_licencia: 67890,
      id_ruta: 4,
    },
    {
      apellido_paterno: "Ramírez",
      apellido_materno: "Torres",
      nombre: "María",
      email: "maria@example.com",
      password: "hash-demo-4",
      rolNombre: "Conductor",
      no_licencia: null,
      id_ruta: 11,
    },
    {
      apellido_paterno: "Flores",
      apellido_materno: "Gómez",
      nombre: "Pedro",
      email: "pedro@example.com",
      password: "hash-demo-5",
      rolNombre: "Admin",
      no_licencia: 22222,
      id_ruta: 6,
    },
  ];

  for (const u of users) {
    // use upsert to avoid duplicates and ensure role connection
    await prisma.usuarios.upsert({
      where: { email: u.email },
      update: {},
      create: {
        apellido_paterno: u.apellido_paterno,
        apellido_materno: u.apellido_materno,
        nombre: u.nombre,
        email: u.email,
        password: u.password,
        no_licencia: u.no_licencia,
        id_ruta: u.id_ruta,
        rol: { connect: { nombre: u.rolNombre } },
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });