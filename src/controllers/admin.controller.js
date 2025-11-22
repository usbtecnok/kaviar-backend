const adminService = require("../services/admin.service");

// =============================
// DASHBOARD
// =============================
exports.dashboard = async (req, res) => {
  try {
    const data = await adminService.dashboard();
    return res.json(data);
  } catch (err) {
    console.error("Erro dashboard admin:", err);
    return res.status(500).json({ message: "Erro ao carregar dashboard." });
  }
};

// =============================
// MOTORISTAS
// =============================
exports.listDrivers = async (req, res) => {
  try {
    const list = await adminService.listDrivers();
    return res.json(list);
  } catch (err) {
    console.error("Erro listar motoristas:", err);
    return res.status(500).json({ message: "Erro ao carregar motoristas." });
  }
};

// =============================
// PASSAGEIROS
// =============================
exports.listPassengers = async (req, res) => {
  try {
    const list = await adminService.listPassengers();
    return res.json(list);
  } catch (err) {
    console.error("Erro listar passageiros:", err);
    return res
      .status(500)
      .json({ message: "Erro ao carregar passageiros." });
  }
};

// =============================
// TRANSAÇÕES
// =============================
exports.listTransactions = async (req, res) => {
  try {
    const list = await adminService.listTransactions();
    return res.json(list);
  } catch (err) {
    console.error("Erro listar transações:", err);
    return res
      .status(500)
      .json({ message: "Erro ao carregar transações." });
  }
};

// =============================
// BÔNUS DE HOTÉIS
// =============================
exports.setHotelBonus = async (req, res) => {
  try {
    const { stars, value } = req.body;

    if (!stars || !value) {
      return res
        .status(400)
        .json({ message: "Faltando estrelas ou valor." });
    }

    const result = await adminService.setHotelBonus(stars, value);
    return res.json({ message: "Bônus atualizado.", result });
  } catch (err) {
    console.error("Erro setHotelBonus:", err);
    return res.status(500).json({ message: "Erro ao salvar bônus de hotel." });
  }
};

// =============================
// BÔNUS TURÍSTICOS
// =============================
exports.setTouristPointBonus = async (req, res) => {
  try {
    const { point_name, value } = req.body;

    if (!point_name || !value) {
      return res
        .status(400)
        .json({ message: "Faltando nome ou valor." });
    }

    const result = await adminService.setTouristPointBonus(point_name, value);
    return res.json({ message: "Bônus atualizado.", result });
  } catch (err) {
    console.error("Erro setTouristPointBonus:", err);
    return res
      .status(500)
      .json({ message: "Erro ao salvar bônus turístico." });
  }
};
