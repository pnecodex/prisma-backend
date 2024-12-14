/*
  Warnings:

  - Made the column `image` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `image` VARCHAR(191) NOT NULL;
