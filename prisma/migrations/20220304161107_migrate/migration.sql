/*
  Warnings:

  - You are about to drop the `catalog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `catalog` DROP FOREIGN KEY `Catalog_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cataloguId_fkey`;

-- DropTable
DROP TABLE `catalog`;

-- CreateTable
CREATE TABLE `catalogueSlug` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catelogueName` VARCHAR(191) NOT NULL,
    `catalogueSlug` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `catalogueSlug` ADD CONSTRAINT `catalogueSlug_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `catalogueSlug`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cataloguId_fkey` FOREIGN KEY (`cataloguId`) REFERENCES `catalogueSlug`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
