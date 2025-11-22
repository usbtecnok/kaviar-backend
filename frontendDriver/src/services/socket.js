import { io } from "socket.io-client";

const socket = io("https://kaviar-backend.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  autoConnect: false
});

export default socket;
