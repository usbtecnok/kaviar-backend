import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4001",
});

api.interceptors.request.use((config) => {
  // Pega o token CORRETO
  const token = localStorage.getItem("kaviar_admin_token");

  // Não envia token na rota de login
  if (config.url?.includes("/auth/login-email")) {
    return config;
  }

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
