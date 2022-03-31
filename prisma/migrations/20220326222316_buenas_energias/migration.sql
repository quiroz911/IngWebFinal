/*
  Warnings:

  - You are about to drop the column `id_leader` on the `Department` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentLeaderId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentLeaderId` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_id_leader_fkey";

-- DropIndex
DROP INDEX "Department_id_leader_key";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "id_leader",
ADD COLUMN     "departmentLeaderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department_departmentLeaderId_key" ON "Department"("departmentLeaderId");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_departmentLeaderId_fkey" FOREIGN KEY ("departmentLeaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
