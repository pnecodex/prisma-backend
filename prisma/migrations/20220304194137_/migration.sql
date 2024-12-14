/*
  Warnings:

  - You are about to drop the column `catelogueName` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `catelogueName`,
    ADD COLUMN `catalogueName` VARCHAR(191) NULL;
