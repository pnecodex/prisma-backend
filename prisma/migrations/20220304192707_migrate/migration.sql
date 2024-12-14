/*
  Warnings:

  - Made the column `catalogueSlug` on table `catalog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `catalog` MODIFY `catalogueSlug` VARCHAR(191) NOT NULL;
