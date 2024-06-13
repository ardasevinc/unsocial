/*
  Warnings:

  - Added the required column `seed_prompt` to the `simulations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "simulations" ADD COLUMN     "seed_prompt" TEXT NOT NULL;
