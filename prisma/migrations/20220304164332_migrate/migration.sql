-- AlterTable
ALTER TABLE `catalog` MODIFY `catalogueSlug` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `comment_text` VARCHAR(191) NOT NULL,
    `commenter_email` VARCHAR(191) NOT NULL,
    `comment_type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
