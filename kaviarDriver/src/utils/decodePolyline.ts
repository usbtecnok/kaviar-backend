import polyline from "polyline";

export function decodePolyline(encoded: string) {
  const points = polyline.decode(encoded);
  return points.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));
}
