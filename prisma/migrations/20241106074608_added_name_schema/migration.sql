-- AlterTable
ALTER TABLE "cover_letters" ADD COLUMN     "name" TEXT,
ALTER COLUMN "jobDescription" DROP NOT NULL,
ALTER COLUMN "resumeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "structured_cvs" ADD COLUMN     "name" TEXT;
