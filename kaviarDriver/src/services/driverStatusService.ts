import axios from "axios";

const API_BASE = "http://SEU_BACKEND:4000";

export async function updateDriverStatus(isOnline: boolean, token: string) {
    const res = await axios.post(
        `${API_BASE}/drivers/status`,
        { isOnline },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
}
