import axios from "axios";

const API_BASE = "http://SEU_BACKEND:4000"; // coloque seu IP local ou domínio

// Enviar status ONLINE/OFFLINE do motorista
export async function sendDriverStatus(driverId: number, isOnline: boolean) {
    return axios.post(`${API_BASE}/drivers/status`, {
        driverId,
        isOnline
    });
}

// Atualizar localização do motorista
export async function updateDriverLocation(driverId: number, lat: number, lng: number) {
    return axios.post(`${API_BASE}/drivers/location`, {
        driverId,
        lat,
        lng
    });
}

// Aceitar corrida
export async function acceptRide(driverId: number, rideId: number) {
    return axios.post(`${API_BASE}/rides/accept`, {
        driverId,
        rideId
    });
}

// Finalizar corrida
export async function finishRide(driverId: number, rideId: number) {
    return axios.post(`${API_BASE}/rides/finish`, {
        driverId,
        rideId
    });
}

export default {
    sendDriverStatus,
    updateDriverLocation,
    acceptRide,
    finishRide
};
