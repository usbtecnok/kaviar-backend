import { Router } from "express";
import {
  registerPassenger,
  loginPassenger,
  getPassengerProfile
} from "../controllers/passengerController.js";

import passengerAuth from "../middleware/passengerAuth.js";

const router = Router();

// Registro e login
router.post("/register", registerPassenger);
router.post("/login", loginPassenger);

// Perfil
router.get("/profile", passengerAuth, getPassengerProfile);

export default router;
