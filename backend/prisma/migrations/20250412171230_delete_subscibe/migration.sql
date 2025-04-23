/*
  Warnings:

  - You are about to drop the column `tiile` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `follows` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `Follows_followers_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `Follows_following_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `tiile`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `follows`;
