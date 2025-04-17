-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('customer', 'chef');

-- AlterTable
ALTER TABLE "Chef" ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'chef';

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'customer';
