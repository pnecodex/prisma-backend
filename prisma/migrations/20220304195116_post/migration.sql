/*
  Warnings:

  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `content`,
    ADD COLUMN `authorId` INTEGER NULL,
    ADD COLUMN `post_content` VARCHAR(191) NULL,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
