import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seed() {
  // 1) Roles
  await prisma.roles.createMany({
    data: [{ rol: "Admin" }, { rol: "Conductor" }, { rol: "Usuario" }],
    skipDuplicates: true,
  });

  // 2) Rutas (create placeholders for punto inicial/final, update after creating puntos)
  const rutasData = [
    { descripcion: "Ruta Centro - Norte", nombre: "Prueba" },
    { descripcion: "Ruta Centro - Sur", nombre: "Prueba 2" },
    { descripcion: "Ruta Este - Oeste", nombre: "Prueba 3" },
  ];

  const rutas = [] as { id: number; descripcion: string; nombre: string }[];
  for (const r of rutasData) {
    const created = await prisma.rutas.create({
      data: { descripcion: r.descripcion, nombre: r.nombre },
    });
    rutas.push({
      id: created.id,
      descripcion: created.descripcion,
      nombre: r.nombre,
    });
  }

  // 3) Puntos_ruta for each ruta, then update ruta with first/last
  for (const ruta of rutas) {
    const puntos = [] as number[];
    for (let i = 0; i < 5; i++) {
      const p = await prisma.puntos_ruta.create({
        data: {
          id_ruta: ruta.id,
          altitud: 19.4 + i * 0.01,
          longitud: -99.1 - i * 0.01,
        },
      });
      puntos.push(p.id);
    }
  }

  // 4) Vehiculos (ensure uniqueness by no_placas)
  const vehiculosData = [
    { no_placas: "ABC-123", no_unidad: "U-01", capacidad: 12 },
    { no_placas: "DEF-456", no_unidad: "U-02", capacidad: 14 },
    { no_placas: "GHI-789", no_unidad: "U-03", capacidad: 10 },
  ];
  const vehiculos = [] as { id: number; no_placas: string }[];
  for (const v of vehiculosData) {
    const existing = await prisma.vehiculos.findFirst({
      where: { no_placas: v.no_placas },
    });
    const created =
      existing ??
      (await prisma.vehiculos.create({
        data: {
          no_placas: v.no_placas,
          no_unidad: v.no_unidad,
          capacidad: v.capacidad,
        },
      }));
    vehiculos.push({ id: created.id, no_placas: created.no_placas });
  }

  // 5) Tipos_reporte (ensure uniqueness by descripcion-like)
  const tiposData = [
    { descripcion: "Mecánico" },
    { descripcion: "Incidente" },
    { descripcion: "Retraso" },
  ];
  const tipos = [] as { id: number; descripcion: string }[];
  for (const t of tiposData) {
    const existing = await prisma.tipos_reporte.findFirst({
      where: { descripcion: t.descripcion },
    });
    const created =
      existing ?? (await prisma.tipos_reporte.create({ data: t }));
    tipos.push({ id: created.id, descripcion: created.descripcion });
  }

  // 6) Usuarios (connect to existing rutas and roles). Mark two as conductores.
  const users = [
    {
      apellido_paterno: "García",
      apellido_materno: "López",
      nombre: "Orlando",
      email: "orlando@example.com",
      password: "hash-demo-1",
      rolNombre: "Conductor" as const,
      no_licencia: 12345,
      rutaIndex: 0,
    },
    {
      apellido_paterno: "Martínez",
      apellido_materno: "Sánchez",
      nombre: "Ana",
      email: "ana@example.com",
      password: "hash-demo-2",
      rolNombre: "Usuario" as const,
      no_licencia: null,
      rutaIndex: 1,
    },
    {
      apellido_paterno: "Hernández",
      apellido_materno: "Pérez",
      nombre: "Carlos",
      email: "carlos@example.com",
      password: "hash-demo-3",
      rolNombre: "Usuario" as const,
      no_licencia: 67890,
      rutaIndex: 2,
    },
    {
      apellido_paterno: "Ramírez",
      apellido_materno: "Torres",
      nombre: "María",
      email: "maria@example.com",
      password: "hash-demo-4",
      rolNombre: "Conductor" as const,
      no_licencia: 11223,
      rutaIndex: 0,
    },
    {
      apellido_paterno: "Flores",
      apellido_materno: "Gómez",
      nombre: "Pedro",
      email: "pedro@example.com",
      password: "hash-demo-5",
      rolNombre: "Admin" as const,
      no_licencia: 22222,
      rutaIndex: 1,
    },
  ];

  const createdUsers = [] as { id: number; email: string; rol: string }[];
  for (const u of users) {
    const ruta = rutas[u.rutaIndex];
    const user = await prisma.usuarios.upsert({
      where: { email: u.email },
      update: {},
      create: {
        apellido_paterno: u.apellido_paterno,
        apellido_materno: u.apellido_materno,
        nombre: u.nombre,
        email: u.email,
        password: u.password,
        no_licencia: u.no_licencia,
        ruta: { connect: { id: ruta.id } },
        rol: { connect: { rol: u.rolNombre } },
      },
    });
    createdUsers.push({ id: user.id, email: user.email, rol: u.rolNombre });
  }

  // 7) Turnos: create a couple per conductor, pair with vehicles
  const conductores = createdUsers.filter((u) => u.rol === "Conductor");
  const turnos = [] as { id: number; id_chofer: number; id_vehiculo: number }[];
  let vehIndex = 0;
  for (const c of conductores) {
    for (let i = 0; i < 2; i++) {
      const v = vehiculos[vehIndex % vehiculos.length];
      vehIndex++;
      const start = new Date();
      start.setHours(6 + i * 6, 0, 0, 0);
      const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
      const turno = await prisma.turnos.create({
        data: {
          id_chofer: c.id,
          id_vehiculo: v.id,
          descripcion: `Turno ${i + 1} de ${c.email}`,
          hora_inicio: start,
          hora_fin: end,
        },
      });
      turnos.push({ id: turno.id, id_chofer: c.id, id_vehiculo: v.id });
    }
  }

  // 8) Reportes: create per turno, using random tipo
  const estados = ["abierto", "en_proceso", "cerrado"] as const;
  for (const t of turnos) {
    for (let i = 0; i < 2; i++) {
      const tipo = tipos[(t.id + i) % tipos.length];
      await prisma.reportes.create({
        data: {
          id_chofer: t.id_chofer,
          id_vehiculo: t.id_vehiculo,
          id_turno: t.id,
          id_tipo_reporte: tipo.id,
          descripcion: `Reporte ${i + 1} del turno ${t.id} (${
            tipo.descripcion
          })`,
          estado: estados[(t.id + i) % estados.length],
        },
      });
    }
  }

  console.log(
    "Seed completado: roles, rutas+puntos, vehiculos, tipos, usuarios, turnos, reportes."
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
