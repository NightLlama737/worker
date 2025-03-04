-- CreateTable
CREATE TABLE "registeredUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "registeredUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registeredUsers_email_key" ON "registeredUsers"("email");
