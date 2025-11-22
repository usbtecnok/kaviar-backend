import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyAYpkhAAtpG5vdoBHlEYAUxJpMwyuhLVXo";

export async function getRoute(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;

  const response = await axios.get(url);

  if (response.data.routes.length === 0) {
    throw new Error("Nenhuma rota encontrada.");
  }

  const route = response.data.routes[0];

  return {
    points: decodePolyline(route.overview_polyline.points),
    distance: route.legs[0].distance.text,
    duration: route.legs[0].duration.text
  };
}

function decodePolyline(encoded) {
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    let dlat = (result & 1) ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    let dlng = (result & 1) ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return points;
}
