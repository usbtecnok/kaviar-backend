import { Router } from "express";

import {
  requestRide,
  acceptRide,
  updateRideStatus,
  getRideById,
  getRidesByPassenger,
  getRidesByDriver
} from "../controllers/rideController.js";

import passengerAuth from "../middleware/passengerAuth.js";
import driverAuth from "../middleware/driverAuth.js";

const router = Router();

// Passageiro solicita corrida
router.post("/request", passengerAuth, requestRide);

// Motorista aceita corrida
router.post("/accept/:id", driverAuth, acceptRide);

// Atualizar status da corrida (driver ou sistema)
router.patch("/status/:id", driverAuth, updateRideStatus);

// Buscar corrida
router.get("/:id", getRideById);

// Histórico do passageiro
router.get("/passenger/history", passengerAuth, getRidesByPassenger);

// Histórico do motorista
router.get("/driver/history", driverAuth, getRidesByDriver);

export default router;
