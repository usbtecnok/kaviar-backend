import axios from "axios";

const GOOGLE_API_KEY = "SUA_GOOGLE_API_KEY_AQUI";

// Pega rota (polyline, distância, duração)
export async function getRoute(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${GOOGLE_API_KEY}`;

  const response = await axios.get(url);

  if (response.data.routes.length === 0) {
    throw new Error("Nenhuma rota encontrada");
  }

  const route = response.data.routes[0];
  const leg = route.legs[0];

  return {
    polyline: route.overview_polyline.points,
    distance: leg.distance.text,
    duration: leg.duration.text,
  };
}
