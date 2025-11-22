import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import socket from "../socket/socket";

export default function PassengerHomeScreen() {
  const passengerId = "PASSENGER123"; // depois pega do login

  useEffect(() => {
    socket.emit("passenger:join", passengerId);

    // Motorista aceitou
    socket.on("passenger:ride_assigned", (data) => {
      console.log("🚗 Motorista aceitou:", data);
    });

    // Motorista se movendo
    socket.on("passenger:driver_location", (loc) => {
      console.log("📍 Localização do motorista:", loc);
    });

    // Corrida começou
    socket.on("passenger:ride_started", () => {
      console.log("🚗💨 Sua corrida começou!");
    });

    // Corrida terminou
    socket.on("passenger:ride_finished", () => {
      console.log("🏁 Corrida finalizada!");
    });

    return () => {
      socket.off("passenger:ride_assigned");
      socket.off("passenger:driver_location");
      socket.off("passenger:ride_started");
      socket.off("passenger:ride_finished");
    };
  }, []);

  return (
    <View>
      <Text>Bem-vindo passageiro!</Text>
      <Button title="Solicitar Corrida" onPress={() => {}} />
    </View>
  );
}
