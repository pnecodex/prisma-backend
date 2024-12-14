/*
  Warnings:

  - You are about to drop the `catalogueslug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `catalogueslug` DROP FOREIGN KEY `catalogueSlug_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cataloguId_fkey`;

-- DropTable
DROP TABLE `catalogueslug`;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catelogueName` VARCHAR(191) NOT NULL,
    `catalogueSlug` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cataloguId_fkey` FOREIGN KEY (`cataloguId`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
