/*
  Warnings:

  - You are about to drop the column `isGlobal` on the `simulation_events` table. All the data in the column will be lost.
  - Added the required column `is_global` to the `simulation_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "simulation_events" DROP COLUMN "isGlobal",
ADD COLUMN     "is_global" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "model" TEXT NOT NULL,
    "post_id" BIGINT,
    "reply_id" BIGINT NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LLMUsage" (
    "id" BIGSERIAL NOT NULL,
    "completion_tokens" INTEGER NOT NULL,
    "prompt_tokens" INTEGER NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "total_cost" MONEY NOT NULL,
    "generation_id" TEXT NOT NULL,

    CONSTRAINT "LLMUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Generation_post_id_key" ON "Generation"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Generation_reply_id_key" ON "Generation"("reply_id");

-- CreateIndex
CREATE UNIQUE INDEX "LLMUsage_generation_id_key" ON "LLMUsage"("generation_id");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LLMUsage" ADD CONSTRAINT "LLMUsage_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
