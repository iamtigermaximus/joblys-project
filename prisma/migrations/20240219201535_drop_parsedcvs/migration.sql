/*
  Warnings:

  - You are about to drop the column `parsedCVId` on the `structured_cvs` table. All the data in the column will be lost.
  - You are about to drop the `parsed_cvs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "parsed_cvs" DROP CONSTRAINT "parsed_cvs_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "structured_cvs" DROP CONSTRAINT "structured_cvs_parsedCVId_fkey";

-- AlterTable
ALTER TABLE "structured_cvs" DROP COLUMN "parsedCVId";

-- DropTable
DROP TABLE "parsed_cvs";
