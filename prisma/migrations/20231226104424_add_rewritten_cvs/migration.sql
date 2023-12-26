-- CreateTable
CREATE TABLE "rewritten_cvs" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rewritten_cvs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rewritten_cvs" ADD CONSTRAINT "rewritten_cvs_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
