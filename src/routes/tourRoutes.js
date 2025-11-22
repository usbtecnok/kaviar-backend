const express = require("express");
const router = express.Router();
const { startTour, completeTour } = require("../controllers/tourController");

router.post("/start", startTour);
router.post("/complete", completeTour);

module.exports = router;
