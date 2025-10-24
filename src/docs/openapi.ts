// Minimal OpenAPI 3.1 spec for Admin API
// Keep it in TS to avoid JSON module config; exported as plain object

const servers = [{ url: "http://localhost:4000", description: "Local" }];

const components = {
  schemas: {
    Pagination: {
      type: "object",
      properties: {
        ok: { type: "boolean" },
        total: { type: "integer" },
        page: { type: "integer" },
        limit: { type: "integer" },
      },
    },
    Usuario: {
      type: "object",
      properties: {
        id: { type: "integer" },
        apellido_paterno: { type: "string" },
        apellido_materno: { type: "string" },
        nombre: { type: "string" },
        id_rol: { type: "integer" },
        no_licencia: { type: ["integer", "null"] },
        id_ruta: { type: "integer" },
        rol: { $ref: "#/components/schemas/Rol" },
        ruta: { $ref: "#/components/schemas/Ruta" },
      },
      required: ["apellido_paterno", "apellido_materno", "nombre", "id_rol", "id_ruta"],
    },
    Rol: {
      type: "object",
      properties: { id: { type: "integer" }, rol: { type: "string" } },
      required: ["rol"],
    },
    Ruta: {
      type: "object",
      properties: {
        id: { type: "integer" },
        descripcion: { type: "string" },
        id_punto_inicial: { type: "integer" },
        id_punto_final: { type: "integer" },
      },
      required: ["descripcion", "id_punto_inicial", "id_punto_final"],
    },
    PuntoRuta: {
      type: "object",
      properties: {
        id: { type: "integer" },
        id_ruta: { type: "integer" },
        altitud: { type: ["number", "null"] },
        longitud: { type: ["number", "null"] },
      },
      required: ["id_ruta"],
    },
    Vehiculo: {
      type: "object",
      properties: {
        id: { type: "integer" },
        no_placas: { type: "string" },
        no_unidad: { type: "string" },
        capacidad: { type: "integer" },
      },
      required: ["no_placas", "no_unidad", "capacidad"],
    },
    Turno: {
      type: "object",
      properties: {
        id: { type: "integer" },
        id_chofer: { type: "integer" },
        id_vehiculo: { type: "integer" },
        descripcion: { type: ["string", "null"] },
        hora_inicio: { type: ["string", "null"], format: "date-time" },
        hora_fin: { type: ["string", "null"], format: "date-time" },
      },
      required: ["id_chofer", "id_vehiculo"],
    },
    TipoReporte: {
      type: "object",
      properties: { id: { type: "integer" }, descripcion: { type: "string" } },
      required: ["descripcion"],
    },
    Reporte: {
      type: "object",
      properties: {
        id: { type: "integer" },
        id_chofer: { type: "integer" },
        id_vehiculo: { type: "integer" },
        id_turno: { type: "integer" },
        id_tipo_reporte: { type: "integer" },
        descripcion: { type: "string" },
        estado: { type: "string" },
      },
      required: ["id_chofer", "id_vehiculo", "id_turno", "id_tipo_reporte", "descripcion", "estado"],
    },
  },
  parameters: {
    Page: { in: "query", name: "page", schema: { type: "integer", minimum: 1 }, required: false },
    Limit: { in: "query", name: "limit", schema: { type: "integer", minimum: 1, maximum: 100 }, required: false },
    IdPath: { in: "path", name: "id", schema: { type: "integer" }, required: true },
  },
};

function crudPaths(base: string, schemaName: string) {
  return {
    [base]: {
      get: {
        tags: [schemaName],
        summary: `List ${schemaName}`,
        parameters: [components.parameters.Page, components.parameters.Limit],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    total: { type: "integer" },
                    page: { type: "integer" },
                    limit: { type: "integer" },
                    data: { type: "array", items: { $ref: `#/components/schemas/${schemaName}` } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: [schemaName],
        summary: `Create ${schemaName}`,
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } },
        },
        responses: { 201: { description: "Created" } },
      },
    },
    [`${base}/{id}`]: {
      get: {
        tags: [schemaName],
        summary: `Get ${schemaName} by id`,
        parameters: [components.parameters.IdPath],
        responses: { 200: { description: "OK" }, 404: { description: "Not Found" } },
      },
      put: {
        tags: [schemaName],
        summary: `Update ${schemaName}`,
        parameters: [components.parameters.IdPath],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
        responses: { 200: { description: "OK" } },
      },
      delete: {
        tags: [schemaName],
        summary: `Delete ${schemaName}`,
        parameters: [components.parameters.IdPath],
        responses: { 200: { description: "OK" } },
      },
    },
  } as const;
}

const paths = {
  ...crudPaths("/api/admin/usuarios", "Usuario"),
  ...crudPaths("/api/admin/roles", "Rol"),
  ...crudPaths("/api/admin/rutas", "Ruta"),
  ...crudPaths("/api/admin/puntos-ruta", "PuntoRuta"),
  ...crudPaths("/api/admin/vehiculos", "Vehiculo"),
  ...crudPaths("/api/admin/turnos", "Turno"),
  ...crudPaths("/api/admin/tipos-reporte", "TipoReporte"),
  ...crudPaths("/api/admin/reportes", "Reporte"),
};

const openapi = {
  openapi: "3.1.0",
  info: {
    title: "RutaYa Admin API",
    version: "1.0.0",
    description: "Documentación del panel de administración",
  },
  servers,
  components,
  paths,
} as const;

export default openapi;
