/*
  Warnings:

  - The primary key for the `HotelBonusConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hotel_stars` on the `HotelBonusConfig` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `RideTransaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stars` to the `HotelBonusConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "verified_email" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verified_phone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HotelBonusConfig" DROP CONSTRAINT "HotelBonusConfig_pkey",
DROP COLUMN "hotel_stars",
ADD COLUMN     "stars" INTEGER NOT NULL,
ADD CONSTRAINT "HotelBonusConfig_pkey" PRIMARY KEY ("stars");

-- AlterTable
ALTER TABLE "RideTransaction" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "OtpCode" (
    "otp_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpCode_pkey" PRIMARY KEY ("otp_id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "passenger_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "password" TEXT,
    "verified_phone" BOOLEAN NOT NULL DEFAULT false,
    "verified_email" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("passenger_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_phone_key" ON "Passenger"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_email_key" ON "Passenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
