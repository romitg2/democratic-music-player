/*
  Warnings:

  - Added the required column `accessType` to the `SpaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('VIEW', 'EDIT');

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "SpaceAccessRequest" ADD COLUMN     "accessType" "AccessType" NOT NULL DEFAULT 'VIEW';

-- AlterTable
ALTER TABLE "SpaceMember" ADD COLUMN     "accessType" "AccessType" NOT NULL;
