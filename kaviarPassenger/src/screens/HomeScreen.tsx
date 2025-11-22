import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Localização é necessária para usar o Kaviar.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  if (!location)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Obtendo localização...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
      >
        <Marker
          coordinate={location}
          title="Você"
          description="Sua localização atual"
          pinColor="#FFD700"
        />
      </MapView>

      <TouchableOpacity
        style={styles.solicitarButton}
        onPress={() =>
          navigation.navigate("RequestRide", {
            pickupLat: location.latitude,
            pickupLng: location.longitude,
          })
        }
      >
        <Text style={styles.solicitarText}>Solicitar Corrida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
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
  solicitarButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    elevation: 4,
  },
  solicitarText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
