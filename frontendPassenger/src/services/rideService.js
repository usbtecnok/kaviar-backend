import api from "./api";

export function createRide(data) {
  return api.post("/api/ride", data);
}

export function getRide(id) {
  return api.get(`/api/ride/${id}`);
}
