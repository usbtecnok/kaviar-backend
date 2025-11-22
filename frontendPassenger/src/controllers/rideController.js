// ---------------------------------------------
// ARQUIVO: backend/src/controllers/rideController.js
// FUNÇÃO: Controlar criação e leitura de Viagens
// ---------------------------------------------

const rideModel = require('../models/rideModel');

// Rota: POST /api/v1/rides/request
async function requestRide(req, res) {
  try {
    // Em um app real, o ID do passageiro viria do token JWT
    const passengerId = req.body.passengerId || 1; // Simulação por enquanto
    const { pickupLat, pickupLng, dropoffLat, dropoffLng } = req.body;

    if (!pickupLat || !pickupLng || !dropoffLat || !dropoffLng) {
      return res.status(400).json({ message: 'Localizações de partida e destino são obrigatórias.' });
    }

    const newRide = await rideModel.createRide({
      passengerId,
      pickupLat,
      pickupLng,
      dropoffLat,
      dropoffLng,
    });

    console.log(`🚗 Viagem ${newRide.id} criada e aguardando motorista...`);

    res.status(201).json({
      message: 'Viagem solicitada com sucesso. Buscando motorista...',
      ride: newRide,
    });
  } catch (error) {
    console.error('Erro ao solicitar viagem:', error);
    res.status(500).json({ message: 'Erro no servidor ao solicitar viagem.' });
  }
}

module.exports = {
  requestRide,
};
