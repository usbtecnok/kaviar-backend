const express = require("express");
const router = express.Router();
const authDriver = require("../middleware/authDriver");
const controller = require("../controllers/driver.controller");

// Todas as rotas do motorista são protegidas
router.get("/profile", authDriver, controller.profile);

router.post("/tour/start", authDriver, controller.startTour);
router.post("/tour/finish", authDriver, controller.finishTour);

router.get("/history", authDriver, controller.history);

module.exports = router;
