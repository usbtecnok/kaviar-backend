import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import socket from "../socket/socket";
import { sendPassengerLocation } from "../services/passengerService";

export default function PassengerActiveRideScreen({ route }) {
  const { passengerId, driverId, pickup, dropoff } = route.params;

  const [passengerLocation, setPassengerLocation] = useState(null);

  // === GPS DO PASSAGEIRO ===
  useEffect(() => {
    let watcher = null;

    async function startTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("🔴 Sem permissão de GPS");
        return;
      }

      watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
        },
        (loc) => {
          const coords = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };

          setPassengerLocation(coords);

          // Envia localização para backend via Socket.io
          sendPassengerLocation(passengerId, driverId, coords.lat, coords.lng);
        }
      );
    }

    startTracking();

    return () => watcher && watcher.remove();
  }, []);

  // === OUVIR ATUALIZAÇÕES DO MOTORISTA ===
  useEffect(() => {
    socket.on("passenger:driver_location", (loc) => {
      console.log("🚗 Motorista movendo-se:", loc);
    });

    return () => {
      socket.off("passenger:driver_location");
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {passengerLocation ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: passengerLocation.lat,
            longitude: passengerLocation.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Passageiro */}
          <Marker
            coordinate={{
              latitude: passengerLocation.lat,
              longitude: passengerLocation.lng,
            }}
            title="Você"
            pinColor="blue"
          />

          {/* Ponto de Partida */}
          <Marker
            coordinate={pickup}
            title="Partida"
            pinColor="green"
          />

          {/* Destino */}
          <Marker
            coordinate={dropoff}
            title="Destino"
            pinColor="red"
          />
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Obtendo localização...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
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
