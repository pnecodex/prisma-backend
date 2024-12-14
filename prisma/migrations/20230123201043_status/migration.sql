/*
  Warnings:

  - You are about to drop the column `status` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `status`,
    ADD COLUMN `statuses` BOOLEAN NULL;
