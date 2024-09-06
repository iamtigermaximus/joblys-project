/*
  Warnings:

  - Added the required column `jobDescription` to the `cover_letters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeId` to the `cover_letters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cover_letters" ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "resumeId" TEXT NOT NULL;
