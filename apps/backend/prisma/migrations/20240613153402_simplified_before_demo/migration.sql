/*
  Warnings:

  - You are about to drop the column `global_importance_score` on the `simulation_events` table. All the data in the column will be lost.
  - You are about to drop the column `is_global` on the `simulation_events` table. All the data in the column will be lost.
  - You are about to drop the column `local_importance_score` on the `simulation_events` table. All the data in the column will be lost.
  - You are about to drop the column `simulation_start` on the `simulations` table. All the data in the column will be lost.
  - You are about to drop the `_AgentFollows` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `simulation_id` to the `agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `simulation_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importance_score` to the `simulation_events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AgentFollows" DROP CONSTRAINT "_AgentFollows_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgentFollows" DROP CONSTRAINT "_AgentFollows_B_fkey";

-- AlterTable
ALTER TABLE "agents" ADD COLUMN     "simulation_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "simulation_id" INTEGER NOT NULL,
ALTER COLUMN "is_repost" DROP NOT NULL,
ALTER COLUMN "repost_count" DROP NOT NULL;

-- AlterTable
ALTER TABLE "simulation_events" DROP COLUMN "global_importance_score",
DROP COLUMN "is_global",
DROP COLUMN "local_importance_score",
ADD COLUMN     "importance_score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "simulations" DROP COLUMN "simulation_start";

-- DropTable
DROP TABLE "_AgentFollows";

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_simulation_id_fkey" FOREIGN KEY ("simulation_id") REFERENCES "simulations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_simulation_id_fkey" FOREIGN KEY ("simulation_id") REFERENCES "simulations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
