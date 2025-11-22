import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { startTour } from "../api";

export default function StartTourScreen({ navigation }) {
  const [driverId, setDriverId] = useState("DRIVER-TESTE-001");
  const [hotelStars, setHotelStars] = useState("5");
  const [tourPoints, setTourPoints] = useState("Cristo Redentor, Museu do Amanhã, Escadaria Selarón");

  async function handleStart() {
    const points = tourPoints.split(",").map(p => p.trim());

    const response = await startTour({
      driverId,
      hotelStars: parseInt(hotelStars),
      tourPoints: points
    });

    if (response.tourId) {
      navigation.navigate("TourComplete", { tourId: response.tourId });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIAR TOUR</Text>

      <Text style={styles.label}>ID do Motorista</Text>
      <TextInput style={styles.input} value={driverId} onChangeText={setDriverId} />

      <Text style={styles.label}>Estrelas do Hotel</Text>
      <TextInput style={styles.input} value={hotelStars} onChangeText={setHotelStars} keyboardType="numeric" />

      <Text style={styles.label}>Pontos Turísticos</Text>
      <TextInput style={styles.input} value={tourPoints} onChangeText={setTourPoints} />

      <Button title="INICIAR TOUR" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#111", flex: 1 },
  title: { color: "#FFD700", fontSize: 26, marginBottom: 20, fontWeight: "bold" },
  label: { color: "#ccc", marginTop: 10 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 6,
    marginTop: 5
  }
});
