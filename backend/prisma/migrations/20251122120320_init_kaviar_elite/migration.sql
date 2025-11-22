/*
  Warnings:

  - You are about to drop the `combo_driver_assign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `combo_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `combo_points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `combos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partners_hotels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "combo_driver_assign" DROP CONSTRAINT "combo_driver_assign_driverId_fkey";

-- DropForeignKey
ALTER TABLE "combo_driver_assign" DROP CONSTRAINT "combo_driver_assign_orderId_fkey";

-- DropForeignKey
ALTER TABLE "combo_orders" DROP CONSTRAINT "combo_orders_comboId_fkey";

-- DropForeignKey
ALTER TABLE "combo_orders" DROP CONSTRAINT "combo_orders_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "combo_points" DROP CONSTRAINT "combo_points_comboId_fkey";

-- DropForeignKey
ALTER TABLE "combos" DROP CONSTRAINT "combos_hotelId_fkey";

-- DropTable
DROP TABLE "combo_driver_assign";

-- DropTable
DROP TABLE "combo_orders";

-- DropTable
DROP TABLE "combo_points";

-- DropTable
DROP TABLE "combos";

-- DropTable
DROP TABLE "drivers";

-- DropTable
DROP TABLE "partners_hotels";

-- CreateTable
CREATE TABLE "Driver" (
    "driver_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "current_level" TEXT NOT NULL DEFAULT 'Bronze',
    "is_certified_kaviar" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "MonthlyMetric" (
    "metric_id" SERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "month_year" TIMESTAMP(3) NOT NULL,
    "total_rides" INTEGER NOT NULL DEFAULT 0,
    "cancellation_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "total_net_earnings" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "total_commission_paid" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "bonus_mei_value" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "bonus_fidelidade_value" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "MonthlyMetric_pkey" PRIMARY KEY ("metric_id")
);

-- CreateTable
CREATE TABLE "RideTransaction" (
    "transaction_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "ride_type" TEXT NOT NULL,
    "base_amount" DOUBLE PRECISION NOT NULL,
    "driver_commission_rate" DOUBLE PRECISION NOT NULL,
    "platform_commission" DOUBLE PRECISION NOT NULL,
    "driver_net_earnings" DOUBLE PRECISION NOT NULL,
    "hotel_bonus" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "tour_points_bonus" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "tour_hourly_premium" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RideTransaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "HotelBonusConfig" (
    "hotel_stars" INTEGER NOT NULL,
    "base_bonus_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HotelBonusConfig_pkey" PRIMARY KEY ("hotel_stars")
);

-- CreateTable
CREATE TABLE "TouristPointBonusConfig" (
    "point_name" TEXT NOT NULL,
    "base_bonus_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TouristPointBonusConfig_pkey" PRIMARY KEY ("point_name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyMetric_driver_id_month_year_key" ON "MonthlyMetric"("driver_id", "month_year");

-- AddForeignKey
ALTER TABLE "MonthlyMetric" ADD CONSTRAINT "MonthlyMetric_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideTransaction" ADD CONSTRAINT "RideTransaction_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;
