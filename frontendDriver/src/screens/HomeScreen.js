import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AuthContext } from "../context/AuthContext";
import useLocationTrack from "../hooks/useLocationTrack";
import socket from "../services/socket";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const driverId = user?.driver?.id;

  const [active, setActive] = useState(false);
  const [coords, setCoords] = useState({
    latitude: -22.9068,
    longitude: -43.1729,
  });

  // 🚗 Envio de localização via REST (backup)
  useLocationTrack(driverId, active);

  // 🚀 Conectar ao Socket.IO
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("🔗 Driver conectado ao Socket.IO");
    });

    // Receber corrida do backend
    socket.on("ride:request", (data) => {
      Alert.alert(
        "🚗 Nova Corrida",
        `Passageiro: ${data.passengerName}`,
        [
          {
            text: "Ver",
            onPress: () =>
              navigation.navigate("RideRequest", { ride: data }),
          },
        ]
      );
    });

    return () => {
      socket.off("ride:request");
      socket.disconnect();
    };
  }, []);

  // 🟢 Motorista fica online/offline
  useEffect(() => {
    if (active) {
      socket.emit("driver:online", { driverId });
    } else {
      socket.emit("driver:offline", { driverId });
    }
  }, [active]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coords} title="Você" />
      </MapView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: active ? "red" : "#e6b800" }]}
          onPress={() => setActive(!active)}
        >
          <Text style={styles.buttonText}>
            {active ? "Ficar Offline" : "Ficar Online"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  bottom: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: { padding: 15, width: "80%", borderRadius: 10 },
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 18 },
  logout: { marginTop: 15, color: "#fff" }
});
