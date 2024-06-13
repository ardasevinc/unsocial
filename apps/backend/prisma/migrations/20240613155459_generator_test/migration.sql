/*
  Warnings:

  - You are about to drop the column `simulationId` on the `Generation` table. All the data in the column will be lost.
  - Added the required column `simulation_id` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Generation" DROP CONSTRAINT "Generation_simulationId_fkey";

-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "simulationId",
ADD COLUMN     "simulation_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_simulation_id_fkey" FOREIGN KEY ("simulation_id") REFERENCES "simulations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
