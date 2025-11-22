import api from "./api";

export async function passengerRegister(data) {
  return api.post("/api/passenger/register", data);
}

export async function passengerLogin(data) {
  return api.post("/api/passenger/login", data);
}

export async function passengerProfile(token) {
  return api.get("/api/passenger/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
}
