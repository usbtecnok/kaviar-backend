import api from "./api";

export async function driverRegister(data) {
  return api.post("/api/driver/register", data);
}

export async function driverLogin(data) {
  return api.post("/api/driver/login", data);
}

export async function driverProfile(token) {
  return api.get("/api/driver/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function driverSetOnline(token, status = "online") {
  return api.patch(
    "/api/driver/status",
    { status },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}
