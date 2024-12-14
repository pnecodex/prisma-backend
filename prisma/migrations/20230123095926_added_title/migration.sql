/*
  Warnings:

  - You are about to drop the column `slug` on the `catalog` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `slug`,
    DROP COLUMN `title`,
    ADD COLUMN `slugs` VARCHAR(191) NULL after `id`,
    ADD COLUMN `titles` VARCHAR(191) NULL after `id`;
