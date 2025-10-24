import { Router } from "express";
import usuarios from "./usuarios.routes";
import roles from "./roles.routes";
import rutas from "./rutas.routes";
import puntosRuta from "./puntos_ruta.routes";
import vehiculos from "./vehiculos.routes";
import turnos from "./turnos.routes";
import tiposReporte from "./tipos_reporte.routes";
import reportes from "./reportes.routes";

const admin = Router();

admin.use("/usuarios", usuarios);
admin.use("/roles", roles);
admin.use("/rutas", rutas);
admin.use("/puntos-ruta", puntosRuta);
admin.use("/vehiculos", vehiculos);
admin.use("/turnos", turnos);
admin.use("/tipos-reporte", tiposReporte);
admin.use("/reportes", reportes);

export default admin;
