const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const { ensureAdmin } = require("../middleware/admin-auth");

// Todas as rotas do ADMIN são protegidas pelo ensureAdmin
router.get("/dashboard", ensureAdmin, controller.dashboard);

router.get("/drivers", ensureAdmin, controller.listDrivers);
router.get("/passengers", ensureAdmin, controller.listPassengers);
router.get("/transactions", ensureAdmin, controller.listTransactions);

router.post("/config/hotel-bonus", ensureAdmin, controller.setHotelBonus);
router.post(
  "/config/tourist-bonus",
  ensureAdmin,
  controller.setTouristPointBonus
);

module.exports = router;
