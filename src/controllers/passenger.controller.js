const passengerService = require("../services/passenger.service");

// ========================
// PERFIL
// ========================
exports.profile = async (req, res) => {
  const data = await passengerService.getPassengerProfile(req.passengerId);
  return res.json(data);
};

// ========================
// ESTIMAR PREÇO
// ========================
exports.estimate = async (req, res) => {
  const data = await passengerService.estimateRide(req.body);
  return res.json(data);
};

// ========================
// SOLICITAR CORRIDA
// ========================
exports.requestRide = async (req, res) => {
  const data = await passengerService.requestRide(req.passengerId, req.body);
  return res.json(data);
};

// ========================
// SOLICITAR TOUR
// ========================
exports.requestTour = async (req, res) => {
  const data = await passengerService.requestTour(req.passengerId, req.body);
  return res.json(data);
};

// ========================
// FINALIZAR CORRIDA NORMAL
// ========================
exports.finishRide = async (req, res) => {
  const { driverId } = req.body;

  const data = await passengerService.finishRide(
    driverId,
    req.passengerId,
    req.body
  );

  return res.json(data);
};

// ========================
// HISTÓRICO
// ========================
exports.history = async (req, res) => {
  const list = await passengerService.getHistory(req.passengerId);
  return res.json(list);
};
