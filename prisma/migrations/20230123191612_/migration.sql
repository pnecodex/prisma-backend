/*
  Warnings:

  - You are about to drop the column `category_block` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `category_commision` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `publish` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `seller_block_id` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `category_block`,
    DROP COLUMN `category_commision`,
    DROP COLUMN `image`,
    DROP COLUMN `price`,
    DROP COLUMN `publish`,
    DROP COLUMN `seller_block_id`,
    ADD COLUMN `status` BOOLEAN NULL;
