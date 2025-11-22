const express = require("express");
const { createAdmin, loginAdmin, getAdminProfile } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Criar admin (opcional)
router.post("/register", createAdmin);

// Login admin
router.post("/login", loginAdmin);

// Perfil admin
router.get("/profile", adminAuth, getAdminProfile);

module.exports = router;
