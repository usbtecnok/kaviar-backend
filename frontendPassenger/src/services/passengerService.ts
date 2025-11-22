import socket from "../socket/socket";

export function sendPassengerLocation(passengerId: number, driverId: number, lat: number, lng: number) {
    socket.emit("passenger:location", {
        passengerId,
        driverId,
        lat,
        lng,
        timestamp: Date.now()
    });
}
