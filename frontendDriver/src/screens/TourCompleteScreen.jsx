import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { completeTour } from "../api";

export default function TourCompleteScreen({ route }) {
  const { tourId } = route.params;

  const [clientPaidAmount, setClientPaidAmount] = useState("600");
  const [tourHours, setTourHours] = useState("6");
  const [result, setResult] = useState(null);

  async function handleComplete() {
    const payload = {
      tourId,
      clientPaidAmount: parseFloat(clientPaidAmount),
      tourHours: parseInt(tourHours)
    };

    const response = await completeTour(payload);
    setResult(response);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Finalizar Tour</Text>

      <Text style={styles.label}>Tour ID</Text>
      <Text style={styles.value}>{tourId}</Text>

      <Text style={styles.label}>Valor Pago (R$)</Text>
      <TextInput style={styles.input} value={clientPaidAmount} onChangeText={setClientPaidAmount} />

      <Text style={styles.label}>Horas do Tour</Text>
      <TextInput style={styles.input} value={tourHours} onChangeText={setTourHours} />

      <Button title="FINALIZAR" onPress={handleComplete} />

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Resultado</Text>
          <Text style={styles.resultText}>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#111", flex: 1 },
  title: { color: "#FFD700", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { color: "#aaa", marginTop: 10 },
  value: { color: "#fff", marginBottom: 10 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 6,
    marginTop: 5
  },
  resultBox: { marginTop: 20, backgroundColor: "#222", padding: 10, borderRadius: 6 },
  resultTitle: { color: "#FFD700", fontWeight: "bold", marginBottom: 10 },
  resultText: { color: "#fff" }
});
