import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyAXQivhdYP5cYtHCWXPjMnjBwwOurveRw4";
const BACKEND = "http://SEU_BACKEND:4000"; // ajuste depois

export default function RoutePreviewScreen({ navigation, route }) {
  const { pickup, destination } = route.params;

  const [polylineCoords, setPolylineCoords] = useState([]);
  const [distanceKm, setDistanceKm] = useState(0);
  const [durationMin, setDurationMin] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Decode polyline
  function decodePolyline(encoded: string) {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  }

  // Buscar rota com Directions API
  useEffect(() => {
    async function loadRoute() {
      try {
        const url =
          "https://maps.googleapis.com/maps/api/directions/json?" +
          `origin=${pickup.lat},${pickup.lng}` +
          `&destination=${destination.lat},${destination.lng}` +
          `&key=${GOOGLE_API_KEY}`;

        const res = await axios.get(url);
        const route = res.data.routes[0];

        const polyline = route.overview_polyline.points;
        setPolylineCoords(decodePolyline(polyline));

        const leg = route.legs[0];
        setDistanceKm(leg.distance.value / 1000);
        setDurationMin(leg.duration.value / 60);

        // fórmula de cálculo da corrida
        const base = 4.50; // Bandeirada
        const price =
          base + (leg.distance.value / 1000) * 1.75 + (leg.duration.value / 60) * 0.60;

        setEstimatedPrice(Number(price.toFixed(2)));
      } catch (e) {
        console.log("Erro ao buscar rota:", e);
      }
    }

    loadRoute();
  }, []);

  // Confirmar corrida (enviar ao backend)
  async function confirmRide() {
    try {
      const res = await axios.post(`${BACKEND}/rides/create`, {
        pickup_latitude: pickup.lat,
        pickup_longitude: pickup.lng,
        dropoff_latitude: destination.lat,
        dropoff_longitude: destination.lng,
        price: estimatedPrice,
      });

      navigation.navigate("SearchingDriver", {
        rideId: res.data.rideId,
      });
    } catch (e) {
      console.log("Erro ao criar corrida:", e);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pickup.lat,
          longitude: pickup.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: pickup.lat, longitude: pickup.lng }} pinColor="gold" />
        <Marker coordinate={{ latitude: destination.lat, longitude: destination.lng }} />

        <Polyline coordinates={polylineCoords} strokeColor="#FFD700" strokeWidth={4} />
      </MapView>

      <View style={styles.bottomBox}>
        <Text style={styles.textTitle}>Resumo da Viagem</Text>

        <Text style={styles.text}>Distância: {distanceKm.toFixed(2)} km</Text>
        <Text style={styles.text}>Duração: {durationMin.toFixed(0)} min</Text>
        <Text style={styles.textPrice}>Preço estimado: R$ {estimatedPrice}</Text>

        <TouchableOpacity style={styles.button} onPress={confirmRide}>
          <Text style={styles.buttonText}>Confirmar Corrida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  bottomBox: {
    backgroundColor: "#000",
    padding: 20,
  },

  textTitle: {
    color: "#FFD700",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },

  textPrice: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
