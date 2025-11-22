import { io } from "socket.io-client";

const SOCKET_URL = "http://SEU_BACKEND:4000"; // coloque IP ou domínio

export const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
});
