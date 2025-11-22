// ---------------------------------------------
// ARQUIVO: backend/src/models/rideModel.js
// FUNÇÃO: Gerenciar a lógica de dados para Viagens (Rides)
// ---------------------------------------------

const db = require('../db/db');

// Cria uma nova viagem
async function createRide({ passengerId, pickupLat, pickupLng, dropoffLat, dropoffLng }) {
  const query = `
    INSERT INTO rides (passenger_id, status, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude)
    VALUES ($1, 'PENDING', $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [passengerId, pickupLat, pickupLng, dropoffLat, dropoffLng];
  const result = await db.query(query, values);
  return result.rows[0];
}

// Busca uma viagem pelo ID
async function findRideById(rideId) {
  const query = 'SELECT * FROM rides WHERE id = $1';
  const result = await db.query(query, [rideId]);
  return result.rows[0];
}

module.exports = {
  createRide,
  findRideById,
};
