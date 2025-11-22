const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ==============================
// LISTAR MOTORISTAS
// ==============================
async function listDrivers() {
  return prisma.driver.findMany({
    orderBy: { created_at: "desc" },
  });
}

// ==============================
// LISTAR PASSAGEIROS
// ==============================
async function listPassengers() {
  return prisma.passenger.findMany({
    orderBy: { created_at: "desc" },
  });
}

// ==============================
// LISTAR TODAS AS CORRIDAS/TOURS
// ==============================
async function listTransactions() {
  return prisma.rideTransaction.findMany({
    orderBy: { completed_at: "desc" },
  });
}

// ==============================
// CONFIGURAR BÔNUS DE HOTEL
// ==============================
async function setHotelBonus(stars, value) {
  return prisma.hotelBonusConfig.upsert({
    where: { stars },
    update: { base_bonus_value: value },
    create: { stars, base_bonus_value: value },
  });
}

// ==============================
// CONFIGURAR BÔNUS TURÍSTICO
// ==============================
async function setTouristPointBonus(point_name, value) {
  return prisma.touristPointBonusConfig.upsert({
    where: { point_name },
    update: { base_bonus_value: value },
    create: { point_name, base_bonus_value: value },
  });
}

// ==============================
// DASHBOARD (resumo geral)
// ==============================
async function dashboard() {
  const drivers = await prisma.driver.count();
  const passengers = await prisma.passenger.count();
  const totalTransactions = await prisma.rideTransaction.count();

  const totalEarnings = await prisma.rideTransaction.aggregate({
    _sum: { base_amount: true },
  });

  return {
    drivers,
    passengers,
    totalTransactions,
    totalRevenue: totalEarnings._sum.base_amount || 0,
  };
}

module.exports = {
  listDrivers,
  listPassengers,
  listTransactions,
  setHotelBonus,
  setTouristPointBonus,
  dashboard,
};
