-- DropIndex
DROP INDEX "messages_email_key";

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");
