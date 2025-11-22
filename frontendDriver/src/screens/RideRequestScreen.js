import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RideRequestScreen({ route, navigation }) {
  const ride = route.params?.ride;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Corrida</Text>

      <Text style={styles.text}>Passageiro: {ride?.passengerName}</Text>
      <Text style={styles.text}>Origem: {ride?.originAddress}</Text>
      <Text style={styles.text}>Destino: {ride?.destinationAddress}</Text>
      <Text style={styles.text}>Preço: R$ {ride?.price}</Text>

      <TouchableOpacity
        style={styles.accept}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>ACEITAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.reject}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>RECUSAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 30 },
  title: { color: "#e6b800", fontSize: 26, marginBottom: 20 },
  text: { color: "#fff", fontSize: 18, marginVertical: 5 },
  accept: { backgroundColor: "#e6b800", padding: 15, marginTop: 30, borderRadius: 10 },
  reject: { backgroundColor: "red", padding: 15, marginTop: 15, borderRadius: 10 },
  btnText: { textAlign: "center", fontSize: 18, fontWeight: "bold" }
});
