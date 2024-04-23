/*
  Warnings:

  - You are about to drop the column `is_global` on the `event_locations` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `event_locations` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `event_locations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[agent_id]` on the table `human_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timezone` to the `agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agent_id` to the `human_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGlobal` to the `simulation_events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_time` to the `simulations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "simulation_events" DROP CONSTRAINT "simulation_events_location_id_fkey";

-- AlterTable
ALTER TABLE "agents" ADD COLUMN     "location_id" INTEGER,
ADD COLUMN     "timezone" TEXT NOT NULL,
ALTER COLUMN "engagement_probability" DROP NOT NULL;

-- AlterTable
ALTER TABLE "event_locations" DROP COLUMN "is_global",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ALTER COLUMN "country" SET DATA TYPE CITEXT,
ALTER COLUMN "city" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "human_accounts" ADD COLUMN     "agent_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "simulation_events" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL,
ALTER COLUMN "location_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "simulations" ADD COLUMN     "current_time" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "human_accounts_agent_id_key" ON "human_accounts"("agent_id");

-- AddForeignKey
ALTER TABLE "simulation_events" ADD CONSTRAINT "simulation_events_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "event_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "event_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "human_accounts" ADD CONSTRAINT "human_accounts_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
