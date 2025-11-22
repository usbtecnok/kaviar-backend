import { Router } from "express";

import {
  createHotel,
  loginHotel,
  createCombo,
  listCombosByHotel,
  listAllCombos,
  createComboOrder,
  getComboOrderStatus,
  driverAcceptComboOrder,
} from "../controllers/comboController.js";

import hotelAuth from "../middleware/hotelAuth.js";
import passengerAuth from "../middleware/passengerAuth.js";
import driverAuth from "../middleware/driverAuth.js";

const router = Router();

// --- Hotel: registro/login ---
router.post("/hotel/register", createHotel);
router.post("/hotel/login", loginHotel);

// --- Hotel: criar combos ---
router.post("/hotel/combos", hotelAuth, createCombo);

// --- Hotel: listar combos do próprio hotel ---
router.get("/hotel/combos", hotelAuth, listCombosByHotel);

// --- Passageiro: ver combos disponíveis ---
router.get("/combos", listAllCombos);

// --- Passageiro: solicitar um combo ---
router.post("/order", passengerAuth, createComboOrder);

// --- Passageiro: status do pedido ---
router.get("/order/:id/status", passengerAuth, getComboOrderStatus);

// --- Motorista: aceitar pedido de combo ---
router.post("/order/:id/accept", driverAuth, driverAcceptComboOrder);

export default router;
