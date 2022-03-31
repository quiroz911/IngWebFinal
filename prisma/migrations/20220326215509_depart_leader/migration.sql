/*
  Warnings:

  - A unique constraint covering the columns `[departmentLeaderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departmentLeaderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_departmentLeaderId_key" ON "User"("departmentLeaderId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentLeaderId_fkey" FOREIGN KEY ("departmentLeaderId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
