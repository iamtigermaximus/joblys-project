-- CreateTable
CREATE TABLE "parsed_pdf_cvs" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parsed_pdf_cvs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parsed_pdf_cvs" ADD CONSTRAINT "parsed_pdf_cvs_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
