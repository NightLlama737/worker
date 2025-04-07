-- CreateTable
CREATE TABLE "messages" (
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "messages_email_key" ON "messages"("email");
