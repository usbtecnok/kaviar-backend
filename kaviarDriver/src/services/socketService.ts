import { io } from "socket.io-client";

const SOCKET_URL = "http://SEU_BACKEND:4000"; // coloque seu IP ou domínio

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export function registerDriver(driverId: number) {
  socket.emit("driver_register", driverId);
}

export function listenNewRides(callback: Function) {
  socket.on("new_ride_request", (data) => {
    callback(data);
  });
}

export default socket;
