/*
  Warnings:

  - You are about to drop the column `id_punto_final` on the `Rutas` table. All the data in the column will be lost.
  - You are about to drop the column `id_punto_inicial` on the `Rutas` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Rutas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rutas" DROP COLUMN "id_punto_final",
DROP COLUMN "id_punto_inicial",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nombre" TEXT NOT NULL;
