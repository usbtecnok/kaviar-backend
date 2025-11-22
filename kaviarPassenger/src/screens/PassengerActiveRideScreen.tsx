import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import io from "socket.io-client";
import axios from "axios";

const SOCKET_URL = "http://SEU_BACKEND:4000"; // coloque seu backend real
const GOOGLE_API_KEY = "SUA_API_GOOGLE_AQUI";

export default function PassengerActiveRideScreen({ navigation, route }) {
  const { rideId, driver } = route.params;

  const [driverPos, setDriverPos] = useState(null);
  const [polyline, setPolyline] = useState([]);
  const mapRef = useRef(null);
  const socketRef = useRef(null);

  // ============================
  // CARREGAR MOTORISTA
  // ============================
  const loadDriverPosition = async () => {
    try {
      const res = await axios.get(`${SOCKET_URL}/api/driver/location/${driver.id}`);
      if (res.data?.location) {
        setDriverPos({
          latitude: res.data.location.lat,
          longitude: res.data.location.lng
        });
      }
    } catch (e) {
      console.log("Erro carregando posição inicial do motorista:", e);
    }
  };

  // ============================
  // CARREGAR ROTA ENTRE MOTORISTA E PASSAGEIRO
  // ============================
  const loadRoute = async (from, to) => {
    try {
      const url =
        "https://maps.googleapis.com/maps/api/directions/json?" +
        `origin=${from.latitude},${from.longitude}` +
        `&destination=${to.latitude},${to.longitude}` +
        `&key=${GOOGLE_API_KEY}`;

      const res = await axios.get(url);
      const points = decodePolyline(res.data.routes[0].overview_polyline.points);

      setPolyline(points);
    } catch (e) {
      console.log("Erro carregando rota:", e);
    }
  };

  // ============================
  // DECODIFICADOR DE POLYLINE
  // ============================
  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;

      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5
      });
    }
    return points;
  };

  // ============================
  // INICIAR SOCKET.IO
  // ============================
  useEffect(() => {
    loadDriverPosition();

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.emit("passenger_join_ride", { rideId });

    socket.on("driver_location", (data) => {
      if (data.driverId === driver.id) {
        const newPos = {
          latitude: data.lat,
          longitude: data.lng,
        };
        setDriverPos(newPos);

        // atualiza rota para seguir o motorista
        loadRoute(newPos, polyline[polyline.length - 1]);
      }
    });

    socket.on("ride_finished", () => {
      navigation.replace("RatingScreen", { rideId });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      {driverPos && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: driverPos.latitude,
            longitude: driverPos.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Motorista */}
          <Marker
            coordinate={driverPos}
            pinColor="yellow"
            title="Motorista"
          />

          {/* Rota */}
          <Polyline
            coordinates={polyline}
            strokeWidth={4}
            strokeColor="#FFD700"
          />
        </MapView>
      )}

      <View style={styles.box}>
        <Text style={styles.title}>Motorista a caminho</Text>
        <Text style={styles.driver}>👤 {driver.name}</Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.cancelText}>Cancelar corrida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ============================
// ESTILOS
// ============================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  map: { flex: 1 },

  box: {
    backgroundColor: "#111",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: { color: "#FFD700", fontSize: 22, fontWeight: "bold" },

  driver: { color: "#fff", marginTop: 8, fontSize: 16 },

  cancelButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#440000",
    borderRadius: 10,
  },

  cancelText: { color: "#ff5555", textAlign: "center", fontSize: 16 },
});
