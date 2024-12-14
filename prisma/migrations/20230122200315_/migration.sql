/*
  Warnings:

  - You are about to drop the column `title` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `title`,
    ADD COLUMN `Title` VARCHAR(191) NULL ;
