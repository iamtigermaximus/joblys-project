-- CreateTable
CREATE TABLE "cover_letters" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cover_letters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cover_letters" ADD CONSTRAINT "cover_letters_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
