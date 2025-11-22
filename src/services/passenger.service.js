const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { calculateRideEarnings } = require("./calculation.service");

// ===============================
// PERFIL DO PASSAGEIRO
// ===============================
async function getPassengerProfile(passengerId) {
  return prisma.passenger.findUnique({
    where: { passenger_id: passengerId }
  });
}

// ===============================
// ESTIMAR PREÇO DE CORRIDA
// ===============================
// Depois podemos integrar Google Maps, mas por agora é mock
async function estimateRide(payload) {
  const { distance_km } = payload;

  // Tarifa padrão mock:
  const base = 5.0;        // Bandeirada
  const perKm = 2.75;      // preço por km
  const total = base + distance_km * perKm;

  return {
    distance_km,
    estimated_price: total
  };
}

// ===============================
// SOLICITAR CORRIDA NORMAL
// ===============================
async function requestRide(passengerId, payload) {
  const { distance_km } = payload;

  // Estimar valor
  const base = 5;
  const perKm = 2.75;
  const total = base + distance_km * perKm;

  // Aqui no futuro vamos localizar o motorista disponível mais próximo
  return {
    passenger_id: passengerId,
    distance_km,
    amount: total,
    status: "pending_driver",
    message: "Corrida solicitada com sucesso. Aguardando motorista."
  };
}

// ===============================
// SOLICITAR TOUR (pode virar o COMBO)
// ===============================
async function requestTour(passengerId, payload) {
  const { hours } = payload;

  const hourlyRate = 100; // padrão do KAVIAR
  const total = hourlyRate * hours;

  return {
    passenger_id: passengerId,
    hours,
    amount: total,
    status: "pending_driver",
    message: "Tour solicitado. Aguardando motorista."
  };
}

// ===============================
// FINALIZAR CORRIDA NORMAL
// ===============================
async function finishRide(driverId, passengerId, payload) {
  const { amount } = payload;

  const earnings = calculateRideEarnings({
    base_amount: amount,
    tour_hours: 0
  }, "Bronze"); // passageiro não ganha, apenas motorista

  const transaction = await prisma.rideTransaction.create({
    data: {
      driver_id: driverId,
      client_id: passengerId,
      ride_type: "PONTO_A_PONTO",
      base_amount: amount,
      driver_commission_rate: earnings.commissionRate,
      platform_commission: earnings.platformCommission,
      driver_net_earnings: earnings.driverNetEarnings
    }
  });

  return {
    status: "completed",
    amount,
    transaction
  };
}

// ===============================
// HISTÓRICO DO PASSAGEIRO
// ===============================
async function getHistory(passengerId) {
  return prisma.rideTransaction.findMany({
    where: { client_id: passengerId },
    orderBy: { completed_at: "desc" }
  });
}

module.exports = {
  getPassengerProfile,
  estimateRide,
  requestRide,
  requestTour,
  finishRide,
  getHistory
};
