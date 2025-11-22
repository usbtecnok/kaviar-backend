// ---------------------------------------------
// ARQUIVO: backend/src/routes/rideRoutes.js
// FUNÇÃO: Definir rotas de Viagens (Rides)
// ---------------------------------------------

const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Rota para solicitar uma nova viagem
// Exemplo: POST /api/v1/rides/request
router.post('/request', rideController.requestRide);

module.exports = router;
