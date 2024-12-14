/*
  Warnings:

  - You are about to drop the column `Title` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `Title`,
    ADD COLUMN `title` VARCHAR(191) NULL;
