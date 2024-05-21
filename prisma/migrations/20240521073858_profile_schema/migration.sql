-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_ownerId_key" ON "profiles"("ownerId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
