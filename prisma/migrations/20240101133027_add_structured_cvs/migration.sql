-- CreateTable
CREATE TABLE "structured_cvs" (
    "id" TEXT NOT NULL,
    "parsedCVId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "structured_cvs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "structured_cvs" ADD CONSTRAINT "structured_cvs_parsedCVId_fkey" FOREIGN KEY ("parsedCVId") REFERENCES "parsed_cvs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structured_cvs" ADD CONSTRAINT "structured_cvs_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
