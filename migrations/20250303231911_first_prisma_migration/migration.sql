/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `registeredUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `registeredUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `registeredUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `registeredUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registeredUsers" ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "registeredUsers_phone_key" ON "registeredUsers"("phone");
