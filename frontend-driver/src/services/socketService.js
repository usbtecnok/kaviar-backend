import { io } from "socket.io-client";

// ⚙️ URL do backend Kaviar (ajuste conforme necessário)
const SOCKET_URL = "http://localhost:4000";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("🔌 Conectado ao servidor Socket.IO:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado do servidor Socket.IO");
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Erro de conexão Socket.IO:", err.message);
    });
  }
  return socket;
};

export const emitEvent = (eventName, data) => {
  if (socket && socket.connected) {
    socket.emit(eventName, data);
  } else {
    console.warn("⚠️ Socket não conectado. Evento não enviado:", eventName);
  }
};

export const subscribeToEvent = (eventName, callback) => {
  if (!socket) return;
  socket.on(eventName, callback);
};

export const unsubscribeFromEvent = (eventName) => {
  if (!socket) return;
  socket.off(eventName);
};

export const getSocket = () => socket;
