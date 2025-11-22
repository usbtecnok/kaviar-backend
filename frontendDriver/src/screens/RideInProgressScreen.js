import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import socket from "../services/socket";

export default function RideInProgressScreen({ route, navigation }) {
  const { ride } = route.params;

  function finishRide() {
    socket.emit("ride:finished", { rideId: ride.id });
    navigation.navigate("Home", { rideFinished: true });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corrida em andamento</Text>

      <Text style={styles.label}>Passageiro:</Text>
      <Text style={styles.value}>{ride.passengerName}</Text>

      <Text style={styles.label}>Destino:</Text>
      <Text style={styles.value}>{ride.destinationAddress}</Text>

      <TouchableOpacity style={styles.finishBtn} onPress={finishRide}>
        <Text style={styles.finishText}>FINALIZAR CORRIDA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 30 },
  title: { color: "#e6b800", fontSize: 24, marginBottom: 20 },
  label: { color: "#888", fontSize: 16, marginTop: 10 },
  value: { color: "#fff", fontSize: 18 },
  finishBtn: {
    marginTop: 40,
    backgroundColor: "green",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  finishText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cancelBtn: { marginTop: 20, padding: 15, alignItems: "center" },
  cancelText: { color: "red" },
});
