/*
  Warnings:

  - You are about to drop the column `publishes` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `publishes`,
    ADD COLUMN `category_commision` VARCHAR(191) NULL,
    ADD COLUMN `publish` BOOLEAN NULL;
