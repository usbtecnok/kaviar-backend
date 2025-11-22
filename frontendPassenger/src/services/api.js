import axios from "axios";

const api = axios.create({
  baseURL: "https://kaviar-backend.onrender.com",
  timeout: 15000,
});

// Intercepta respostas para depuração
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ ERRO API:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
