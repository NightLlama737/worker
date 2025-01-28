/*
  Warnings:

  - You are about to drop the column `posts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `posts`,
    DROP COLUMN `profile`,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;
