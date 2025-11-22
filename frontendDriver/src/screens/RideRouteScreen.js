import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getRoute } from "../services/directions";

export default function RideRouteScreen({ route, navigation }) {
  const ride = route.params.ride;
  const driverLocation = route.params.driverLocation;

  const [polyline, setPolyline] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  async function loadRoute() {
    const result = await getRoute(driverLocation, {
      latitude: ride.pickupLat,
      longitude: ride.pickupLng,
    });

    setPolyline(result.points);
    setDistance(result.distance);
    setDuration(result.duration);
  }

  useEffect(() => {
    loadRoute();
  }, []);

  function openGoogleMaps() {
    const lat = ride.pickupLat;
    const lng = ride.pickupLng;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

    Linking.openURL(url);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={driverLocation}
          title="Você"
          pinColor="gold"
        />

        <Marker
          coordinate={{ latitude: ride.pickupLat, longitude: ride.pickupLng }}
          title="Passageiro"
        />

        <Polyline coordinates={polyline} strokeWidth={5} strokeColor="gold" />
      </MapView>

      <View style={styles.panel}>
        <Text style={styles.text}>Distância: {distance}</Text>
        <Text style={styles.text}>Tempo: {duration}</Text>
        <Text style={styles.text}>Passageiro: {ride.passengerName}</Text>

        <TouchableOpacity style={styles.btn} onPress={openGoogleMaps}>
          <Text style={styles.btnText}>IR PELO GOOGLE MAPS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "green" }]}
          onPress={() =>
            navigation.navigate("Home", { startRide: true, ride: ride })
          }
        >
          <Text style={styles.btnText}>CHEGUEI AO PASSAGEIRO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { width: "100%", height: "60%" },
  panel: {
    width: "100%",
    height: "40%",
    backgroundColor: "#111",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: "#e6b800",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  btnBack: {
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
