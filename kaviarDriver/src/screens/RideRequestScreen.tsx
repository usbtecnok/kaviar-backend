import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RideRequestScreen({ route, navigation }) {
  const { ride } = route.params || {};

  const pickup = ride?.pickup || { lat: -22.9, lng: -43.2 };
  const dropoff = ride?.dropoff || { lat: -22.91, lng: -43.21 };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Nova Corrida Recebida</Text>

      {/* Informações da corrida */}
      <View style={styles.card}>
        <Text style={styles.label}>Origem:</Text>
        <Text style={styles.value}>
          Lat: {pickup.lat.toFixed(5)}, Lng: {pickup.lng.toFixed(5)}
        </Text>

        <Text style={styles.label}>Destino:</Text>
        <Text style={styles.value}>
          Lat: {dropoff.lat.toFixed(5)}, Lng: {dropoff.lng.toFixed(5)}
        </Text>

        <Text style={styles.label}>Distância Estimada:</Text>
        <Text style={styles.value}>{ride?.distance || "5 km"}</Text>

        <Text style={styles.label}>Valor da Corrida:</Text>
        <Text style={styles.value}>{ride?.fare || "R$ 22,00"}</Text>
      </View>

      {/* Botões */}
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() =>
          navigation.navigate("ActiveRide", {
            ride,
            pickup,
            dropoff,
          })
        }
      >
        <Text style={styles.acceptText}>ACEITAR CORRIDA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.routeButton}
        onPress={() =>
          navigation.navigate("MapScreen", {
            pickup,
            dropoff,
          })
        }
      >
        <Text style={styles.routeText}>VER ROTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  label: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  acceptButton: {
    backgroundColor: "#FFD700",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  acceptText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  routeButton: {
    borderColor: "#FFD700",
    borderWidth: 2,
    padding: 14,
    borderRadius: 12,
  },
  routeText: {
    color: "#FFD700",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
