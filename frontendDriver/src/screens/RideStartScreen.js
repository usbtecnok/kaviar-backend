import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getRoute } from "../services/directions";
import socket from "../services/socket";

export default function RideStartScreen({ route, navigation }) {
  const { ride } = route.params;

  const [driverLocation, setDriverLocation] = useState({
    latitude: ride.pickupLat,
    longitude: ride.pickupLng,
  });

  const [polyline, setPolyline] = useState([]);

  async function loadToDestination() {
    const result = await getRoute(driverLocation, {
      latitude: ride.dropLat,
      longitude: ride.dropLng,
    });

    setPolyline(result.points);
  }

  useEffect(() => {
    loadToDestination();
  }, []);

  function startRide() {
    socket.emit("ride:started", { rideId: ride.id });
    navigation.navigate("RideInProgress", { ride });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...driverLocation,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker coordinate={driverLocation} title="Você" pinColor="gold" />
        <Marker
          coordinate={{
            latitude: ride.dropLat,
            longitude: ride.dropLng,
          }}
          title="Destino"
        />
        <Polyline coordinates={polyline} strokeWidth={5} strokeColor="gold" />
      </MapView>

      <View style={styles.panel}>
        <Text style={styles.title}>Passageiro a bordo</Text>

        <TouchableOpacity style={styles.btn} onPress={startRide}>
          <Text style={styles.btnText}>INICIAR CORRIDA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { width: "100%", height: "60%" },
  panel: { backgroundColor: "#111", padding: 20, height: "40%" },
  title: { color: "#fff", fontSize: 22, marginBottom: 20 },
  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  btnBack: { marginTop: 20, alignItems: "center" },
  backText: { color: "#999" },
});
