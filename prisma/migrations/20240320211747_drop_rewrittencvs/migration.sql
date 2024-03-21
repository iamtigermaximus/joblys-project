/*
  Warnings:

  - You are about to drop the `rewritten_cvs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rewritten_cvs" DROP CONSTRAINT "rewritten_cvs_ownerId_fkey";

-- DropTable
DROP TABLE "rewritten_cvs";
