/*
  Warnings:

  - You are about to drop the column `view` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `Favorites_course_fkey`;

-- DropIndex
DROP INDEX `Favorites_course_fkey` ON `favorites`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `view`;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_course_fkey` FOREIGN KEY (`course`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
