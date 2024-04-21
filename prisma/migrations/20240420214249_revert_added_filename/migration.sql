/*
  Warnings:

  - You are about to drop the column `filename` on the `cover_letters` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `structured_cvs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cover_letters" DROP COLUMN "filename";

-- AlterTable
ALTER TABLE "structured_cvs" DROP COLUMN "filename";
