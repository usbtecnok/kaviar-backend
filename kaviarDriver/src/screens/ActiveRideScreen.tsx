import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import socket from "../socket/socket";
import * as Location from "expo-location";

const SOCKET_URL = "http://SEU_BACKEND:4000";  // 🔥 ALTERE AQUI 🔥

export default function ActiveRideScreen({ route }) {
  const { pickup, dropoff } = route.params;
  const [driverLocation, setDriverLocation] = useState(null);

  // === 1) INICIAR GPS DO MOTORISTA ===
  useEffect(() => {
    let watcher = null;

    async function startTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("GPS sem permissão");
        return;
      }

      watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5, // envia a cada 5 metros
        },
        (loc) => {
          const coords = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };

          setDriverLocation(coords);

          // 🔥 Envia localização para o backend
          socket.emit("driver:location", coords);
        }
      );
    }

    startTracking();

    return () => {
      if (watcher) watcher.remove();
    };
  }, []);

  // === 2) RECEBER ATUALIZAÇÕES DO BACKEND (Opcional) ===
  useEffect(() => {
    socket.on("ride:update", (data) => {
      console.log("Atualização de corrida:", data);
    });

    return () => socket.off("ride:update");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {driverLocation ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: driverLocation.lat,
            longitude: driverLocation.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Motorista */}
          <Marker
            coordinate={{
              latitude: driverLocation.lat,
              longitude: driverLocation.lng,
            }}
            title="Você"
            description="Sua localização atual"
            pinColor="gold"
          />

          {/* Ponto de partida */}
          <Marker
            coordinate={{
              latitude: pickup.lat,
              longitude: pickup.lng,
            }}
            title="Ponto de Partida"
            pinColor="green"
          />

          {/* Destino */}
          <Marker
            coordinate={{
              latitude: dropoff.lat,
              longitude: dropoff.lng,
            }}
            title="Destino"
            pinColor="red"
          />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Obtendo sua localização...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFD700",
    fontSize: 18,
  },
});

