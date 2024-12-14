/*
  Warnings:

  - You are about to drop the column `catalogueSlug` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `catalogueSlug`,
    ADD COLUMN `slug` VARCHAR(191) NULL;
