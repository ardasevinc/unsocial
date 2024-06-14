-- AlterTable
ALTER TABLE "simulations" ALTER COLUMN "simulation_end" DROP NOT NULL,
ALTER COLUMN "current_time" DROP NOT NULL;
