import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function PassengerRideRequestScreen({ route, navigation }) {
  const { pickup } = route.params;

  const [destination, setDestination] = useState("");

  function handleRequestRide() {
    navigation.navigate("ActiveRide", {
      pickup,
      dropoff: destination,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Local de Partida:</Text>
      <Text style={styles.coord}>
        {pickup.latitude.toFixed(5)}, {pickup.longitude.toFixed(5)}
      </Text>

      <Text style={styles.label}>Destino:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o destino"
        placeholderTextColor="#999"
        value={destination}
        onChangeText={setDestination}
      />

      <TouchableOpacity style={styles.button} onPress={handleRequestRide}>
        <Text style={styles.buttonText}>Confirmar Corrida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#FFD700", fontSize: 22, marginBottom: 10 },
  coord: { color: "#fff", marginBottom: 20 },
  label: { color: "#fff", marginTop: 20 },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
