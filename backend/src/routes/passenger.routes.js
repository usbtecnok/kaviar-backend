const express = require("express");
const router = express.Router();
const authPassenger = require("../middleware/authPassenger");
const controller = require("../controllers/passenger.controller");

// Proteger todas as rotas do passageiro
router.get("/profile", authPassenger, controller.profile);

router.post("/estimate", authPassenger, controller.estimate);

router.post("/request-ride", authPassenger, controller.requestRide);
router.post("/request-tour", authPassenger, controller.requestTour);

router.post("/finish-ride", authPassenger, controller.finishRide);

router.get("/history", authPassenger, controller.history);

module.exports = router;
