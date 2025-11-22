const driverService = require("../services/driver.service");

// ====================
// PERFIL DO MOTORISTA
// ====================
exports.profile = async (req, res) => {
  const data = await driverService.getDriverProfile(req.driverId);
  return res.json(data);
};

// ====================
// INICIAR TOUR
// ====================
exports.startTour = async (req, res) => {
  const data = await driverService.startTour(req.driverId, req.body);
  return res.json({
    message: "Tour iniciado.",
    data
  });
};

// ====================
// FINALIZAR TOUR
// ====================
exports.finishTour = async (req, res) => {
  try {
    const data = await driverService.finishTour(req.driverId, req.body);
    return res.json({
      message: "Tour finalizado com sucesso.",
      ...data
    });
  } catch (error) {
    console.error("Erro ao finalizar tour:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// ====================
// HISTÓRICO
// ====================
exports.history = async (req, res) => {
  const list = await driverService.getHistory(req.driverId);
  return res.json(list);
};
