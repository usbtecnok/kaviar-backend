import { Router } from "express";
import {
  registerDriver,
  loginDriver,
  getDriverProfile,
  updateDriverStatus
} from "../controllers/driverController.js";

import driverAuth from "../middleware/driverAuth.js";

const router = Router();

// Registro e login
router.post("/register", registerDriver);
router.post("/login", loginDriver);

// Perfil
router.get("/profile", driverAuth, getDriverProfile);

// Atualizar status (online/offline)
router.patch("/status", driverAuth, updateDriverStatus);

export default router;
