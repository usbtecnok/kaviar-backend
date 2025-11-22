const API_BASE_URL = "http://localhost:3000";

export async function startTour(data) {
  const response = await fetch(`${API_BASE_URL}/tour/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function completeTour(data) {
  const response = await fetch(`${API_BASE_URL}/tour/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}
