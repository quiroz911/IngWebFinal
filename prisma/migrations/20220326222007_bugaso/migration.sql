/*
  Warnings:

  - A unique constraint covering the columns `[id_leader]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentLeaderId_fkey";

-- DropIndex
DROP INDEX "User_departmentLeaderId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_leader_key" ON "Department"("id_leader");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_id_leader_fkey" FOREIGN KEY ("id_leader") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
