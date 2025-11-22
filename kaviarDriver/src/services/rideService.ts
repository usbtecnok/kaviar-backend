import axios from "axios";

const API_BASE = "http://SEU_BACKEND:4000";

export async function acceptRide(rideId: number, token: string) {
    return axios.post(
        `${API_BASE}/rides/accept`,
        { rideId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
}

export async function updateRideStatus(rideId: number, status: string, token: string) {
    try {
        const response = await fetch(`${API_BASE}/rides/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ rideId, status }),
        });

        return await response.json();
    } catch (err) {
        console.log("Erro ao atualizar status da corrida:", err);
        return null;
    }
}
