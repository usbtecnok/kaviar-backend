import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import decodePolyline from "../utils/decodePolyline";

export default function MapScreen({ route }) {
  const { pickup, dropoff } = route.params || {};

  const [coords, setCoords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pickup || !dropoff) {
      Alert.alert("Erro", "Coordenadas inválidas!");
      return;
    }

    loadRoute();
  }, []);

  async function loadRoute() {
    try {
      const API_KEY = "SUA_GOOGLE_MAPS_API_KEY_AQUI"; // << Trocar por sua key

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.lat},${pickup.lng}&destination=${dropoff.lat},${dropoff.lng}&mode=driving&key=${API_KEY}`;

      const response = await axios.get(url);

      if (response.data.routes.length === 0) {
        Alert.alert("Erro", "Nenhuma rota encontrada.");
        return;
      }

      const points = response.data.routes[0].overview_polyline.points;
      const decoded = decodePolyline(points);

      setCoords(decoded);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao carregar rota.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: pickup.lat,
        longitude: pickup.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      {/* Marcador da Origem */}
      <Marker
        coordinate={{ latitude: pickup.lat, longitude: pickup.lng }}
        title="Origem"
        pinColor="#00FF00"
      />

      {/* Marcador do Destino */}
      <Marker
        coordinate={{ latitude: dropoff.lat, longitude: dropoff.lng }}
        title="Destino"
        pinColor="#FF0000"
      />

      {/* Linha da Rota */}
      <Polyline
        coordinates={coords}
        strokeColor="#FFD700"
        strokeWidth={5}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
