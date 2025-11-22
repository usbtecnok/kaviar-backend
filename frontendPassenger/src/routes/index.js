// ---------------------------------------------
// ARQUIVO: backend/src/routes/index.js
// FUNÇÃO: Agrupar todas as rotas da API
// ---------------------------------------------

const express = require('express');
const router = express.Router();

const rideRoutes = require('./rideRoutes');

// Exemplo: /api/v1/rides/request
router.use('/rides', rideRoutes);

module.exports = router;
