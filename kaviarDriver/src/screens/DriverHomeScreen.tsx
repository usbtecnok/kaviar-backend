import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { registerDriver, listenNewRides } from "../services/socketService";

export default function DriverHomeScreen({ navigation }) {

  const driverId = 1; // ⚠️ depois integrar com login real

  useEffect(() => {
    registerDriver(driverId);

    listenNewRides((ride) => {
      console.log("📡 Nova corrida recebida:", ride);

      navigation.navigate("RideRequest", {
        ride,
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaviar Driver</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => console.log("Aguardando corridas...")}
      >
        <Text style={styles.txt}>Aguardando chamadas...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFD700", marginBottom: 20 },
  btn: { backgroundColor: "#FFD700", padding: 16, borderRadius: 12 },
  txt: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
