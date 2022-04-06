/*
  Warnings:

  - You are about to drop the column `image` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "image",
ADD COLUMN     "picture" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
