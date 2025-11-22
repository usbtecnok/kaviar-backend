import io from "socket.io-client";

const socket = io("http://SEU_BACKEND:4000");

export function listenDriverLocation(driverId: number, callback: (coords:any) => void) {
  socket.emit("passenger_register", driverId);

  socket.on("driver_location_update", (coords) => {
    callback(coords); // envia coords para a tela
  });
}
