/*
  Warnings:

  - You are about to drop the `_role-page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_role-page" DROP CONSTRAINT "_role-page_A_fkey";

-- DropForeignKey
ALTER TABLE "_role-page" DROP CONSTRAINT "_role-page_B_fkey";

-- DropTable
DROP TABLE "_role-page";

-- CreateTable
CREATE TABLE "_PageToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageToRole_AB_unique" ON "_PageToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToRole_B_index" ON "_PageToRole"("B");

-- AddForeignKey
ALTER TABLE "_PageToRole" ADD FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToRole" ADD FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
