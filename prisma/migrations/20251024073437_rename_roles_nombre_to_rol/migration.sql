/*
  Warnings:

  - You are about to drop the column `nombre` on the `Roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rol]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rol` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Roles_nombre_key";

-- DropIndex
DROP INDEX "public"."Usuarios_no_licencia_key";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "nombre",
ADD COLUMN     "rol" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rutas" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_punto_inicial" INTEGER NOT NULL,
    "id_punto_final" INTEGER NOT NULL,

    CONSTRAINT "Rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puntos_ruta" (
    "id" SERIAL NOT NULL,
    "id_ruta" INTEGER NOT NULL,
    "altitud" DOUBLE PRECISION,
    "longitud" DOUBLE PRECISION,

    CONSTRAINT "Puntos_ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculos" (
    "id" SERIAL NOT NULL,
    "no_placas" TEXT NOT NULL,
    "no_unidad" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "Vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turnos" (
    "id" SERIAL NOT NULL,
    "id_chofer" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "descripcion" TEXT,
    "hora_inicio" TIMESTAMP(3),
    "hora_fin" TIMESTAMP(3),

    CONSTRAINT "Turnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipos_reporte" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Tipos_reporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reportes" (
    "id" SERIAL NOT NULL,
    "id_chofer" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "id_turno" INTEGER NOT NULL,
    "id_tipo_reporte" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Reportes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_rol_key" ON "Roles"("rol");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_id_ruta_fkey" FOREIGN KEY ("id_ruta") REFERENCES "Rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puntos_ruta" ADD CONSTRAINT "Puntos_ruta_id_ruta_fkey" FOREIGN KEY ("id_ruta") REFERENCES "Rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnos" ADD CONSTRAINT "Turnos_id_chofer_fkey" FOREIGN KEY ("id_chofer") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnos" ADD CONSTRAINT "Turnos_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_id_chofer_fkey" FOREIGN KEY ("id_chofer") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_id_turno_fkey" FOREIGN KEY ("id_turno") REFERENCES "Turnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_id_tipo_reporte_fkey" FOREIGN KEY ("id_tipo_reporte") REFERENCES "Tipos_reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
