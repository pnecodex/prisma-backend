/*
  Warnings:

  - You are about to drop the `useer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `useer`;

-- CreateTable
CREATE TABLE `Ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NULL,
    `views` INTEGER NULL,
    `productId` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
