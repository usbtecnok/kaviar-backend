import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { getDriverProfile, updateDriverLocation, updateDriverProfile } from "../services/driverProfileService";

export default function HomeDriverScreen({ navigation }) {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = global.authToken; // Token armazenado globalmente após login

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const result = await getDriverProfile(token);
    if (result.success) {
      setDriver(result.data);
    }
    setLoading(false);
  }

  async function toggleStatus() {
    const newStatus = driver.status === "online" ? "offline" : "online";

    const result = await updateDriverProfile(token, { status: newStatus });

    if (result.success) {
      setDriver({ ...driver, status: newStatus });
    }
  }

  async function sendLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão de localização negada!");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    await updateDriverLocation(token, loc.coords.latitude, loc.coords.longitude);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {driver.name}</Text>
      <Text style={styles.sub}>Status atual: {driver.status?.toUpperCase()}</Text>

      <TouchableOpacity
        style={[
          styles.statusButton,
          driver.status === "online" ? styles.btnOnline : styles.btnOffline,
        ]}
        onPress={toggleStatus}
      >
        <Text style={styles.statusText}>
          {driver.status === "online" ? "FICAR OFFLINE" : "FICAR ONLINE"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.locationBtn} onPress={sendLocation}>
        <Text style={styles.locationText}>Enviar Localização Atual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.navigate("RideList")}
      >
        <Text style={styles.menuText}>Corridas Disponíveis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.navigate("DriverProfile")}
      >
        <Text style={styles.menuText}>Meu Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 70,
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E1C16E",
  },

  sub: {
    marginTop: 5,
    fontSize: 16,
    color: "#aaa",
  },

  statusButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },

  btnOnline: {
    backgroundColor: "#444",
    borderColor: "#E1C16E",
    borderWidth: 2,
  },

  btnOffline: {
    backgroundColor: "#E1C16E",
  },

  statusText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },

  locationBtn: {
    marginTop: 20,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1C16E",
  },

  locationText: {
    color: "#E1C16E",
    textAlign: "center",
    fontSize: 15,
  },

  menuBtn: {
    marginTop: 25,
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
  },

  menuText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },

  loading: {
    color: "#fff",
    fontSize: 22,
  },
});
