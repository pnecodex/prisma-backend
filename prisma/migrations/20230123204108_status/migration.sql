/*
  Warnings:

  - You are about to drop the column `statuses` on the `catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `catalog` DROP COLUMN `statuses`,
    ADD COLUMN `status` BOOLEAN NULL comment 'active inactive';
