/*
  Warnings:

  - You are about to drop the column `projectLeaderId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `projectMemberId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_PageToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_member` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_id_leader_fkey";

-- DropForeignKey
ALTER TABLE "_PageToRole" DROP CONSTRAINT "_PageToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_PageToRole" DROP CONSTRAINT "_PageToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "_member" DROP CONSTRAINT "_member_A_fkey";

-- DropForeignKey
ALTER TABLE "_member" DROP CONSTRAINT "_member_B_fkey";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id_leader" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "projectLeaderId",
DROP COLUMN "projectMemberId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_PageToRole";

-- DropTable
DROP TABLE "_member";

-- CreateTable
CREATE TABLE "_role-page" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_project-member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_role-page_AB_unique" ON "_role-page"("A", "B");

-- CreateIndex
CREATE INDEX "_role-page_B_index" ON "_role-page"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_project-member_AB_unique" ON "_project-member"("A", "B");

-- CreateIndex
CREATE INDEX "_project-member_B_index" ON "_project-member"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_id_leader_fkey" FOREIGN KEY ("id_leader") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_role-page" ADD FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_role-page" ADD FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_project-member" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_project-member" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
