/*
  Warnings:

  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(280)`.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageId" TEXT,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(280);

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");
