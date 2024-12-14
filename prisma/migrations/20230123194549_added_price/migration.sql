-- AlterTable
ALTER TABLE `catalog` ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `price` INTEGER NULL,
    ADD COLUMN `seller_block_id` BOOLEAN NULL;
