/*
  Warnings:

  - You are about to alter the column `salutation` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Enum("Salutation")`.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Enum("Role")`.
  - The migration will add a unique constraint covering the columns `[personal_number]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[username]` on the table `users`. If there are existing duplicate values, the migration will fail.

*/
-- CreateEnum
CREATE TYPE "Salutation" AS ENUM ('HERR', 'FRAU');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "salutation" SET DATA TYPE "Salutation" USING salutation::"Salutation",
ALTER COLUMN "role" SET DATA TYPE "Role" USING role::"Role";

-- CreateIndex
CREATE UNIQUE INDEX "users.personal_number_unique" ON "users"("personal_number");

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");
