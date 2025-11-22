const { PrismaClient } = require('@prisma/client');
const { calculateRideEarnings } = require('../utils/calculateRideEarnings');

const prisma = new PrismaClient();

/**
 * INICIAR TOUR
 */
async function startTour(req, res) {
  try {
    const { driverId, hotelStars, tourPoints } = req.body;

    if (!driverId) {
      return res.status(400).json({ message: "driverId é obrigatório." });
    }

    // Criar registro de início do tour
    const newTour = await prisma.rideTransaction.create({
      data: {
        driver_id: driverId,
        client_id: "CLIENTE-TEMP",
        ride_type: "TOUR",
        base_amount: 0,               // será definido ao finalizar
        driver_commission_rate: 0,
        platform_commission: 0,
        driver_net_earnings: 0,
        hotel_bonus: 0,
        tour_points_bonus: 0,
        tour_hourly_premium: 0,
        status: "started",
        tour_points: tourPoints || [],
        hotel_stars: hotelStars || 0
      }
    });

    return res.status(201).json({
      status: "started",
      tourId: newTour.transaction_id
    });

  } catch (error) {
    console.error("Erro iniciar tour:", error);
    return res.status(500).json({ message: "Erro ao iniciar tour." });
  }
}

/**
 * FINALIZAR TOUR
 */
async function completeTour(req, res) {
  try {
    const { tourId, clientPaidAmount, tourHours } = req.body;

    if (!tourId || !clientPaidAmount || !tourHours) {
      return res.status(400).json({ message: "Dados incompletos." });
    }

    const tour = await prisma.rideTransaction.findUnique({
      where: { transaction_id: tourId }
    });

    if (!tour) {
      return res.status(404).json({ message: "Tour não encontrado." });
    }

    if (tour.status !== "started") {
      return res.status(400).json({ message: "Tour já finalizado." });
    }

    const driver = await prisma.driver.findUnique({
      where: { driver_id: tour.driver_id }
    });

    // Cálculo
    const earnings = calculateRideEarnings(
      {
        base_amount: clientPaidAmount,
        tour_hours: tourHours,
        hotel_stars: tour.hotel_stars,
        tour_points: tour.tour_points
      },
      driver.current_level
    );

    // Atualizar tour
    const updatedTour = await prisma.rideTransaction.update({
      where: { transaction_id: tourId },
      data: {
        base_amount: clientPaidAmount,
        driver_commission_rate: earnings.commissionRate,
        platform_commission: earnings.platformCommission,
        driver_net_earnings: earnings.driverNetEarnings,
        hotel_bonus: earnings.hotelBonus,
        tour_points_bonus: earnings.tourPointsBonus,
        tour_hourly_premium: earnings.tourHourlyPremium,
        status: "completed"
      }
    });

    return res.status(200).json({
      status: "completed",
      tourId,
      driverGains: earnings.driverNetEarnings,
      bonus: earnings.totalBonus,
      details: earnings
    });

  } catch (error) {
    console.error("Erro finalizar tour:", error);
    return res.status(500).json({ message: "Erro ao finalizar tour." });
  }
}

module.exports = {
  startTour,
  completeTour
};
