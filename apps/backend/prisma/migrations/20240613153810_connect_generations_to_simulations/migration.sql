/*
  Warnings:

  - Added the required column `simulationId` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "simulationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "simulations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
