import axios from "axios";

const API_BASE = "http://SEU_BACKEND:4000";

export async function driverLogin(email: string, password: string) {
    const res = await axios.post(`${API_BASE}/auth/driver/login`, {
        email,
        password
    });
    return res.data;
}

export async function registerDriver(name: string, email: string, password: string) {
    const res = await axios.post(`${API_BASE}/auth/driver/register`, {
        name,
        email,
        password
    });
    return res.data;
}
