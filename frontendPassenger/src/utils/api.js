import axios from "axios";

// ⚙️ URL base do backend Kaviar
// Para testes locais, use "http://localhost:4000/api"
// Em produção (Render, Cloudflare, etc.), troque pelo domínio público
const API_BASE_URL = "http://localhost:4000/api";

// Cria instância global do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor opcional — adiciona token se existir
api.interceptors.request.use(
  async (config) => {
    // Exemplo: pegar token salvo no AsyncStorage
    // const token = await AsyncStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
