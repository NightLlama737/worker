-- CreateTable
CREATE TABLE `registeredUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `worker_Id` INTEGER NOT NULL,
    `phone` INTEGER NOT NULL,

    UNIQUE INDEX `registeredUsers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
