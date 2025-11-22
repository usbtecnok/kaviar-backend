const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { calculateRideEarnings } = require("./calculation.service");

// ==============================
// PERFIL DO MOTORISTA
// ==============================
async function getDriverProfile(driverId) {
  const driver = await prisma.driver.findUnique({
    where: { driver_id: driverId }
  });

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const metrics = await prisma.monthlyMetric.findUnique({
    where: {
      driver_id_month_year: {
        driver_id: driverId,
        month_year: monthStart
      }
    }
  });

  return { driver, metrics };
}

// ==============================
// INICIAR TOUR
// ==============================
async function startTour(driverId, payload) {
  return {
    status: "started",
    driverId,
    started_at: new Date(),
    ...payload
  };
}

// ==============================
// FINALIZAR TOUR (COM CÁLCULO)
// ==============================
async function finishTour(driverId, payload) {
  const { amount, hours, hotelStars, tourPoints, clientId } = payload;

  // 1) Buscar nível
  const driver = await prisma.driver.findUnique({ where: { driver_id: driverId } });
  const level = driver.current_level;

  // 2) Calcular ganhos
  const earnings = calculateRideEarnings({
    base_amount: amount,
    tour_hours: hours,
    hotel_stars: hotelStars,
    tour_points: tourPoints
  }, level);

  // 3) Registrar transação
  const transaction = await prisma.rideTransaction.create({
    data: {
      driver_id: driverId,
      client_id: clientId || "CLIENTE-KAVIAR",
      ride_type: "TOUR",
      base_amount: amount,

      driver_commission_rate: earnings.commissionRate,
      platform_commission: earnings.platformCommission,
      driver_net_earnings: earnings.driverNetEarnings,

      hotel_bonus: earnings.hotelBonus,
      tour_points_bonus: earnings.tourPointsBonus,
      tour_hourly_premium: earnings.tourHourlyPremium,
    }
  });

  // 4) Atualizar métricas do mês
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  await prisma.monthlyMetric.upsert({
    where: {
      driver_id_month_year: {
        driver_id: driverId,
        month_year: monthStart
      }
    },
    update: {
      total_rides: { increment: 1 },
      total_net_earnings: { increment: earnings.driverNetEarnings }
    },
    create: {
      driver_id: driverId,
      month_year: monthStart,
      total_rides: 1,
      total_net_earnings: earnings.driverNetEarnings
    }
  });

  return {
    earnings,
    transaction,
  };
}

// ==============================
// HISTÓRICO
// ==============================
async function getHistory(driverId) {
  return prisma.rideTransaction.findMany({
    where: { driver_id: driverId },
    orderBy: { completed_at: "desc" }
  });
}

module.exports = {
  getDriverProfile,
  startTour,
  finishTour,
  getHistory
};
