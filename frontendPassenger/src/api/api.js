import axios from "axios";

// Altere o IP conforme sua rede local
const API_URL = "http://10.45.185.154:3000";

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
export { API_URL };
