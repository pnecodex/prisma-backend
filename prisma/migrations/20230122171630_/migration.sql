/*
  Warnings:

  - You are about to drop the column `catalogueName` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `catalogueSlug` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `catalogueName`,
    DROP COLUMN `catalogueSlug`,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;
