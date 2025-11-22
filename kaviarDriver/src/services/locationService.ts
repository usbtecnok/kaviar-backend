import * as Location from "expo-location";
import io from "socket.io-client";

const socket = io("http://SEU_BACKEND:4000"); // coloque seu IP

export async function startDriverLocation(driverId: number) {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permissão de localização negada");
    return;
  }

  socket.emit("driver_register", driverId);

  setInterval(async () => {
    const loc = await Location.getCurrentPositionAsync({});
    socket.emit("driver_location", {
      driverId,
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });
  }, 3000);
}
