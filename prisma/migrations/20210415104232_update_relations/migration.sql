/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[updated_by]` on the table `marital_status`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[created_by]` on the table `marital_status`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[updated_by]` on the table `tax_offices`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[created_by]` on the table `tax_offices`. If there are existing duplicate values, the migration will fail.
  - Made the column `created_at` on table `tax_offices` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `tax_offices` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "marital_status" ADD COLUMN     "created_by" INTEGER;

-- AlterTable
ALTER TABLE "tax_offices" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "marital_status_updated_by_unique" ON "marital_status"("updated_by");

-- CreateIndex
CREATE UNIQUE INDEX "marital_status_created_by_unique" ON "marital_status"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "tax_offices_updated_by_unique" ON "tax_offices"("updated_by");

-- CreateIndex
CREATE UNIQUE INDEX "tax_offices_created_by_unique" ON "tax_offices"("created_by");

-- AddForeignKey
ALTER TABLE "marital_status" ADD FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_offices" ADD FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_offices" ADD FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
