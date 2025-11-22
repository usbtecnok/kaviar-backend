import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import io from "socket.io-client";

const SOCKET_URL = "http://SEU_BACKEND:4000"; // ajuste para seu backend real

export default function SearchingDriverScreen({ navigation, route }) {
  const { rideId } = route.params;

  const [socket, setSocket] = useState(null);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const s = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(s);

    s.emit("passenger_waiting", { rideId });

    s.on("driver_assigned", (data) => {
      setDriver(data.driver);

      // Vai para a corrida ativa
      navigation.replace("PassengerActiveRide", {
        rideId,
        driver: data.driver,
      });
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="#FFD700" size="large" />

      <Text style={styles.title}>Buscando Motorista...</Text>

      <Text style={styles.subText}>
        Aguarde enquanto encontramos o motorista mais próximo.
      </Text>

      {driver && (
        <View style={styles.driverBox}>
          <Text style={styles.driverText}>
            Motorista encontrado: {driver.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#FFD700",
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
  },

  subText: {
    color: "#999",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  driverBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#111",
    borderRadius: 10,
  },

  driverText: {
    color: "#FFD700",
    fontSize: 18,
  },
});
