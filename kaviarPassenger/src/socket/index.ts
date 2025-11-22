import { io } from "socket.io-client";

// Trocar pelo IP REAL do backend
export const SOCKET = io("http://SEU_BACKEND:4000", {
  transports: ["websocket"],
});
